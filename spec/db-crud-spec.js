var _db = require('../db.js')

describe('A db', function(){
	var db

	beforeEach(function(){
		db = new _db()
	})

	it('is a collection of objects in memory', function(){
		expect(db).toBeDefined()
	})

	it('expects a key and a value in order to add an item', function(){
		db.set('a-key', {value: 'a-value'})
		expect(db.get('a-key')).toBeDefined()

		expect(function(){
			db.set()
		}).toThrow()

		expect(function(){
			db.set(undefined, {value: 'a-key-must-be-defined'})
		}).toThrow()

		expect(function(){
			db.set('a-value-must-be-defined', undefined)
		}).toThrow()
	})

	it('only accepts strings as a key. However, an empty string is not a valid key', function(){
		db.set('string-key', {description: 'string-is-a-valid-key'})
		expect(db.get('string-key')).toBeDefined()

		expect(function(){
			db.set('', {description: 'empty-string-is-an-invalid-key'})
		}).toThrow()

		expect(function(){
			db.set(100, {description: 'number-is-an-invalid-key'})
		}).toThrow()
		
		expect(function(){
			db.set(true, {description: 'boolean-is-an-invalid-key'})
		}).toThrow()
		
		expect(function(){
			db.set(false, {description: 'boolean-is-an-invalid-key'})
		}).toThrow()
		
		expect(function(){
			db.set(new Object(), {description: 'object-is-an-invalid-key'})
		}).toThrow()
		
		expect(function(){
			db.set({}, {description: 'object-is-an-invalid-key'})
		}).toThrow()
		
		expect(function(){
			db.set(function(){}, {description: 'function-is-an-invalid-key'})
		}).toThrow()
		
		expect(function(){
			db.set([], {description: 'array-is-an-invalid-key'})
		}).toThrow()
	})

	it('does not accept gabage as valid value', function(){
		var invalidValues = {
			'strings': 'Sorry. No strings. Just create a variable for that. ;)',
			'and no numbers': 1000,
			'or booleans': true,
			'yep, no booleans': false,
			'also no functions': function doSomethingSpecial(){},
			'And of course, no null value': null,
			'nor undefined': undefined,
			'nor empty strings': ''
		}

		for (var key in invalidValues){
			expect(function(){
				db.set(key, value)
			}).toThrow()
		}
	})

	it('only accepts objects (documents) and arrays (collections) as valid values', function(){
		var acceptedValues = {
			'an-object': {},
			'any-object!': new Object(),
			'arrays': [],
			'and-of-course-arrays-of-objects-as-well': [{}, {}]
		}

		for (var key in acceptedValues){
			db.set(key, acceptedValues[key])
			expect(db.get(key)).toBeDefined()
		}
	})

	describe('provides simple CRUD operations thru methods like', function(){
		it('set, which adds a new pair of key-value or updates a previously added one', function(){
			db.set('some-key', {value: 'some-value'})
			expect(db.get('some-key')).toEqual({value: 'some-value'})
			
			db.set('some-key', {value: 'updated-value'})
			expect(db.get('some-key')).toEqual({value: 'updated-value'})
		})

		it('get, which retrieves a pair of key-value previously added', function(){
			db.set('another-key', {value: 'another-value'})

			expect(db.get('another-key')).toEqual({value: 'another-value'})
		})

		it('del, which removes a pair of key-value previously added', function(){
			db.set('some-other-key', {value: 'some-other-value'})
			expect(db.get('some-other-key')).toEqual({value: 'some-other-value'})

			db.del('some-other-key')
			expect(db.get('some-other-key')).not.toBeDefined()
		})
	})
})