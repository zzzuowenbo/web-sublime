var API_CONFIG = {
	login:      ['/sessions/users','post'],
	getUsername:['/sessions/username','get'],
	logout:     ['/sessions/users','delete'],
	register:   ['/users','post']
}

module.exports = {
	API_CONFIG
}