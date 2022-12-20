
module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
		console.log("Pinche culero, dale a ese bot a full ");


    
	},
};