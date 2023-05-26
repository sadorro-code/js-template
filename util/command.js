module.exports = class Command {
    name = "unknown";
    description = "N/A";
    usage = "";
    ownerOnly = false;

    async run(_) {
        throw "Not implemented"
    }
}