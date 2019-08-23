var API_CONFIG = {
	login:      	['/sessions/users','post'],
	getUsername: 	['/sessions/username','get'],
	logout:     	['/sessions/users','delete'],
	register:   	['/users','post'],
	checkUsername: 	['/users/checkUsername','get'],
	getUserinfo: 	['/sessions/users','get'],
	updateUsers: 	['/users','put']
}

module.exports = {
	API_CONFIG
}