module.exports = function(){
	var db = {}

	return {
		set: function(key, value){
			if (!key || !value || typeof key != 'string' || typeof value != 'object')
				throw new Error('A key (string) and a value (object or array) are expected in order to add an item')

			db[key] = value
		},
		get: function(key){
			return db[key]
		},
		del: function(key){
			return delete db[key]
		}
	}
}