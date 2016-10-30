var _dbm = require('../dbm.js')

describe('A dbm', function(){

	beforeEach(function(){
		dbm = new _dbm()
	})

	it('creates and holds multiple database instances in memory with set/get methods', function(){
		var dbs = ['my-db', 'my-db2', 'another-db']

		for (var i = 0, length = dbs.length; i < length; i++)
			dbm.set(dbs[i])

		expect(dbm.get('my-db')).toBeDefined()
		expect(dbm.get('my-db2')).toBeDefined()
		expect(dbm.get('my-db')).toBeDefined()
	})

	it('removes a db with the del method', function(){
		var db_name = 'removed-db'

		dbm.set(db_name)
		expect(dbm.get(db_name)).toBeDefined()

		dbm.del(db_name)
		expect(dbm.get('_dbs')[db_name]).not.toBeDefined()
	})

	it('returns all dbs if you invoke the get method with the key \'_dbs\'', function(){
		expect(dbm.get('_dbs')).toBeDefined()

		dbm.set('db1')
		dbm.set('db2')

		expect(dbm.get('_dbs').db1).toBeDefined()
		expect(dbm.get('_dbs').db2).toBeDefined()
	})

	it('throws an exception if a db is not defined and you try to get it', function(){
		expect(function(){
			dbm.set('deleted-db')
			expect(dbm.get('deleted-db')).toBeDefined()

			dbm.del('deleted-db')
		
			dbm.get('deleted-db')
		}).toThrow()

		expect(function(){
			dbm.get('unexisting-db')
		}).toThrow()

		expect(function(){
			dbm.get(null)
		}).toThrow()

		expect(function(){
			dbm.get(undefined)
		}).toThrow()

		expect(function(){
			dbm.get()
		}).toThrow()
	})

	it('throws an exception if you try to set a db without name', function(){
		expect(function(){
			dbm.set(null)
		}).toThrow()

		expect(function(){
			dbm.set(undefined)
		}).toThrow()

		expect(function(){
			dbm.set()
		}).toThrow()
	})

	it('will also throw exceptions if the name is not a string', function(){
		expect(function(){
			dbm.set(function(){})
		}).toThrow()

		expect(function(){
			dbm.set(true)
		}).toThrow()

		expect(function(){
			dbm.set(false)
		}).toThrow()

		expect(function(){
			dbm.set(100)
		}).toThrow()
	})

	it('also throws an exception if you try to set _dbs, since it is a reserved namespace', function(){
		expect(function(){
			dbm.set('_dbs')
		}).toThrow()
	})
})