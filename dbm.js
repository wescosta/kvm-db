module.exports = function() {
	var dbs = {},
			namespaces = /_dbs/,
			views = {
				'_dbs': dbs
			},
			error = function(mgs){
				throw new Error('dbm error: ' + mgs)
			},
			validate = function(db_name){
				this.name = function(){
					if (!db_name || typeof db_name !== 'string') error('A db must have a name and it has to be a string')
					return this
				},
				this.namespaces = function(){
					if (namespaces.test(db_name)) error('A db name must not match ' + namespaces)
					return this
				},
				this.duplicated = function(){
					if (dbs[db_name]) error('db ' + db_name + ' already defined')
					return this
				},
				this.unexisting = function(){
					if (!dbs[db_name]) error('db ' + db_name + ' not defined')
					return this
				}

				return this
			}

	return {
		set: function(db_name){
			validate(db_name).name().namespaces().duplicated()
			
			dbs[db_name] = {}

			return dbs[db_name]
		},
		get: function(db_name){
			try {
				validate(db_name).name().namespaces()
			} catch (e) {
				return views[db_name.match(namespaces)]
			}
			
			validate(db_name).unexisting()

			return dbs[db_name]
		},
		del: function(db_name){
			validate(db_name).name().unexisting()

			return delete dbs[db_name]
		}
	}
}