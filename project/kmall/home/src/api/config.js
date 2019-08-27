var API_CONFIG = {
	login:      		['/sessions/users','post'],
	getUsername: 		['/sessions/username','get'],
	logout:     		['/sessions/users','delete'],
	register:   		['/users','post'],
	checkUsername: 		['/users/checkUsername','get'],
	getUserinfo: 		['/sessions/users','get'],
	updateUsers: 		['/users','put'],
	getHomeCategories: 	['/categories/homeCategories','get'],
	getPositionAds:     ['/ads/positionAds','get'],
    getFloors:          ['/floors','get'],
    getProductsList:   	['/products/list','get'],
    getProductsDetail:  ['/products/detail','get'],
    addCarts: 			['/carts','post'],
    getCartsCount:      ['/carts/count','get'],
    getCarts: 			['/carts','get'],
    updateCartsChoices: ['/carts/choices','put'],
    deleteCarts: 		['/carts','delete'],
    updateCartsCounts:  ['/carts/counts','put'],
    getOrdersProducts:  ['/orders/products','get'],
    addShippings:        ['/shippings','post']
}

module.exports = {
	API_CONFIG
}