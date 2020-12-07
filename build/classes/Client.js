"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path = require("path");
const stringNormalize_1 = require("../functions/stringNormalize");
const database_1 = require("../lib/database");
const config = require("../config.json");
const DatabaseError_1 = require("../exceptions/DatabaseError");
const CommandError_1 = require("../exceptions/CommandError");
const getMuteRole_1 = require("../functions/getMuteRole");
const unsanction_1 = require("../functions/unsanction");
const formatDate_1 = require("../functions/formatDate");
class Client extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new Map();
        this.aliases = new Map();
        this.operational = false;
    }
    async init() {
        if (!config.botOwner || !config.botOwner.match(/^\d+$/)) {
            console.warn("Owner's ID is undefined or invalid.");
        }
        try {
            await database_1.databaseCheck();
        }
        catch (error) {
            throw new DatabaseError_1.DatabaseError(`Could not check database; ${error.message}`);
        }
        const commandsPath = path.join(__dirname, "../commands/");
        const commandsFolders = await fs_1.promises.readdir(commandsPath);
        for (const folder of commandsFolders) {
            const commandPath = path.join(commandsPath, folder);
            try {
                await this.loadCommand(commandPath);
            }
            catch (error) {
                console.error(`Could not load command in ${folder};\n${error.stackTrace}`);
            }
        }
        const eventsPath = path.join(__dirname, "../events/");
        const eventsFolders = await fs_1.promises.readdir(eventsPath);
        for (const folder of eventsFolders) {
            const eventPath = path.join(eventsPath, folder);
            try {
                await this.loadEvent(eventPath, folder);
            }
            catch (error) {
                console.error(`Could not load event in ${folder};\n${error.stackTrace}`);
            }
        }
        await this.login(config.token);
        await this.user?.setPresence({
            activity: {
                name: "starting...",
                type: "PLAYING",
            },
            status: "dnd",
        });
        const servers = Array.from(this.guilds.cache.values());
        if (servers.length > 0) {
            for (const server of servers) {
                await this.initServer(server);
            }
            const sanctionned = await database_1.db.from("users").whereIn("actual_sanction", ["muted", "banned"]);
            for (const user of sanctionned) {
                if (!user.expiration) {
                    continue;
                }
                const guild = this.guilds.cache.get(user.server_id);
                if (!guild) {
                    continue;
                }
                await unsanction_1.unsanction(user.discord_id, guild, user.actual_sanction);
            }
        }
        this.on("guildCreate", this.initServer);
        this.on("guildDelete", async (guild) => {
            for (const table of ["infractions", "users", "servers"]) {
                await database_1.db.from(table).where({ server_id: guild.id }).delete();
            }
        });
        this.operational = true;
        try {
            await this.updatePresence();
        }
        catch (error) {
            console.error(`Error while updating bot's presence: invalid config.\n${error}`);
        }
        console.log(`FlagBot started at ${formatDate_1.formatDate()}.`);
    }
    async loadCommand(filePath) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { default: CommandClass } = await Promise.resolve().then(() => require(filePath));
        const command = new CommandClass(this);
        if (!command.informations.name) {
            return console.info(`Command in '${filePath}' does not have any name. Skipping...`);
        }
        if (this.commands.has(command.informations.name)) {
            return console.info(`Command ${command.informations.name} in '${filePath}' already exists. Skipping...`);
        }
        this.commands.set(command.informations.name, command);
        const category = stringNormalize_1.stringNormalize(command.informations.category || "Misc");
        command.setCategory(category);
        command.setPath(filePath);
        console.info(`Command ${command.informations.name} loaded.`);
        if (!command.informations.aliases) {
            return;
        }
        for (const alias of command.informations.aliases) {
            const double = this.aliases.get(alias) || this.commands.get(alias);
            if (double) {
                console.warn(`Alias ${alias} already exist for command ${double.informations.name}.`);
                continue;
            }
            this.aliases.set(alias, command);
        }
    }
    async loadEvent(eventPath, name) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { default: EventClass } = await Promise.resolve().then(() => require(eventPath));
        const event = new EventClass(this);
        this.on(event.event, event.listener.bind(event));
        console.info(`Event ${name} (${event.event}) loaded.`);
    }
    reloadCommand(command) {
        for (const [key, value] of this.aliases) {
            if (value === command) {
                this.aliases.delete(key);
            }
        }
        try {
            this.commands.delete(command.informations.name);
            delete require.cache[require.resolve(command.informations.path)];
            return this.loadCommand(command.informations.path);
        }
        catch (error) {
            throw new CommandError_1.CommandError(`Could not reload command ${command.informations.name}; ${error}`);
        }
    }
    async updatePresence() {
        const configUpdated = await Promise.resolve().then(() => require("../config.json"));
        const { active, name, type } = configUpdated.game;
        const presence = {
            activity: {
                name,
                type: type,
            },
        };
        if (active) {
            await this.user?.setPresence(presence);
        }
        await this.user?.setStatus(configUpdated.status || "online");
    }
    async initServer(server) {
        const dbServer = await database_1.db.from("servers").where({ server_id: server.id });
        if (!dbServer[0]) {
            await database_1.db.insert({ ...database_1.defaultServerConfig, server_id: server.id }).into("servers");
        }
        try {
            await getMuteRole_1.getMuteRole(server);
        }
        catch {
            try {
                await server.owner?.send(`[${server.name}] FlagBot doesn't have sufficent permissions to work.`);
            }
            catch { }
        }
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map