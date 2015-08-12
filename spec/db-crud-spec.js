var _db = require('../db.js')

xdescribe('A db', function(){
	var db

	beforeEach(function(){
		db = new _db()
	})

	it('is a key-value object in memory', function(){
		expect(db).toBeDefined()
	})

	it('expects a key and a value in order to add an item', function(){
		db.set('a-key', 'a-value')
		expect(db.get('a-key')).toBeDefined()

		expect(function(){
			db.set()
		}).toThrow()

		expect(function(){
			db.set(undefined, 'a-key-must-be-defined')
		}).toThrow()

		expect(function(){
			db.set('a-value-must-be-defined', undefined)
		}).toThrow()
	})

	it('only accepts strings as a key. However, an empty string is not a valid key', function(){
		db.set('string-key', 'string-is-a-valid-key')
		expect(db.get('my-key')).toBeDefined()

		expect(function(){
			db.set('', 'empty-string-is-an-invalid-key')
		}).toThrow()

		expect(function(){
			db.set(100, 'number-is-an-invalid-key')
		}).toThrow()

		expect(function(){
			db.set(100, 'number-is-an-invalid-key')
		}).toThrow()
		
		expect(function(){
			db.set(true, 'boolean-is-an-invalid-key')
		}).toThrow()
		
		expect(function(){
			db.set(false, 'boolean-is-an-invalid-key')
		}).toThrow()
		
		expect(function(){
			db.set(new Object(), 'object-is-an-invalid-key')
		}).toThrow()
		
		expect(function(){
			db.set({}, 'object-is-an-invalid-key')
		}).toThrow()
		
		expect(function(){
			db.set(function(){}, 'function-is-an-invalid-key')
		}).toThrow()
		
		expect(function(){
			db.set([], 'array-is-an-invalid-key')
		}).toThrow()
	})

	it('accepts any value as a value, expect null, undefined and empty strings', function(){
		expect(function(){
			db.set('null-is-not-accepted-as-a-value-to-avoid-trash', null)
		}).toThrow()

		expect(function(){
			db.set('undefined-is-not-accepted-as-a-value-to-avoid-trash', undefined)
		}).toThrow()

		expect(function(){
			db.set('empty-string-is-not-accepted-as-a-value-to-avoid-trash', '')
		}).toThrow()

		var acceptedValues = {
			'strings': 'as you would expect, a string (with something in it) is a valid value. ;)',
			'numbers': 1000,
			'booleans-too!': true,
			'booleans-too-2!': false,
			'also-a-function': function doSomethingSpecial(){},
			'an-object': {},
			'any-object!': new Object(),
			'and-offcourse-arrays-as-well': []
		}

		for (var key in acceptedValues){
			db.set(key, acceptedValues[key])
			expect(db.get(key)).toBeDefined()
		}
	})

	describe('provides simple CRUD operations thru methods like', function(){
		it('set, which adds a new pair of key-value or updates a previously added one', function(){
			db.set('some-key', 'some-value')
			expect(db.get('some-key')).toBe('some-value')
			
			db.set('some-key', 'updated-value')
			expect(db.get('some-key')).toBe('updated-value')
		})

		it('get, which retrieves a pair of key-value previously added', function(){
			db.set('another-key', 'another-value')

			expect(db.get('another-key')).toBe('another-value')
		})

		it('del, which removes a pair of key-value previously added', function(){
			db.set('some-other-key', 'some-other-value')
			expect(db.get('some-other-key')).toBe('some-other-value')

			db.del('some-other-key')
			expect(db.get('some-other-key')).not.toBeDefined()
		})
	})
})