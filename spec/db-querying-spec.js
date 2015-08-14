var _db = require('../db.js')

xdescribe('A db', function(){
	var db

	beforeEach(function(){
		db = new _db()
	})

	describe('is useful when you set objects as values', function(){
		before(function(){
			var _document = {
				id: 'it\'s best to use some sort of UUID - https://en.wikipedia.org/wiki/Universally_unique_identifier',
				description: 'As an object, your document can be whatever you want and can have any property you wish. :)',
				date: 'Aug 12 2015'
			},
			invoice = {
				id: '99fec4a4-426b-11e5-a151-feff819cdc9f',
				description: 'car rental invoice',
				date: 'Feb 12 2015'
			},
			secret = {
				id: '99fec34d-426b-11e5-a151-feff819cdc9f',
				description: 'top secret',
				date: undefined
			},
			recipe = {
				id: '99fec71a-426b-11e5-a151-feff819cdc9f',
				description: 'mom\'s mac and cheese recipe'
			}

			db.set('doc', _document)
			db.set('invoice', invoice)
			db.set('secret', secret)
			db.set('recipe', recipe)
		})

		it('then query by id', function(){
			var results = db.find({id: '99fec4a4-426b-11e5-a151-feff819cdc9f'})

			expect(results.length).toBe(1)
			expect(results[0]).toEqual(invoice)
		})

		it('then query by any property in the document (object)', function(){
			expect(db.find({date: 'Aug 12 2015'})[0]).toEqual(_document)
			expect(db.find({description: 'car rental invoice'})[0]).toEqual(invoice)
		})

		it('then query by checking if a document has a specific property or value', function(){
			var documents = db.find({$has: 'date'})

			expect(documents.length).toBe(2)
			expect(documents[0]).toEqual(_document)
			expect(documents[1]).toEqual(invoice)
		})

		it('then query also by checking if a document has no such property or value', function(){
			var documents = db.find({$hasno: 'date'})

			expect(documents.length).toBe(2)
			expect(documents[0]).toEqual(secret)
			expect(documents[1]).toEqual(recipe)
		})
	})

	describe('works best as a collection (arrays of objects)', function(){
		var people, tasks

		before(function(){
			people = [{
				name: 'John Johnson Jr. Jr.',
				birth: 'Jan 01 2000',
				address: {
					street: '10, some st.',
					city: 'Some city',
					statte: 'SS - (Short for some state)'
				},
				phones: {
					house: '123-1234-123', 
					mobile: '999-9999-999',
					work: '987-9876-987'
				},
				interests: ['sports', 'cooking', 'traveling'],
				social: {
					facebook: 'john-johnson-jr-jr',
					twitter:  '@jj-jr-jr',
					'google+':  'jjjrjr+'
				}
			}, {
				name: 'Paul Paulson Jr. Jr.',
				birth: 'Dec 01 2000',
				address: {
					street: '100, another st.',
					city: 'Another city',
					statte: 'AS - (Short for another state)'
				},
				phones: {
					house: '000-0000-000', 
					mobile: '777-7777-777',
					work: '687-9876-986'
				},
				interests: ['business', 'entrepreneurship', 'traveling'],
				social: {
					facebook: 'paul-paulson-jr-jr',
					twitter:  '@pp-jr-jr',
					'google+':  'ppjrjr+'
				}
			}]

			tasks = [{
				name: 'Apply for master degree',
				expires: 'Nov 3 2015',
				status: 'todo'
			},{
				name: 'Read 10 books in a year',
				expires: 'Dec 31 2015',
				status: 'on-progress'
			},{
				name: 'Prepare JS training presentation',
				expires: 'Aug 20 2015',
				status: 'done'
			},{
				name: 'Book flight to Brazil',
				expires: 'Nov 15 2015',
				status: 'todo'
			},{
				name: 'Renew visa',
				expires: 'Dec 15 2015',
				status: 'done'
			},{
				name: 'Prepare JS Forum presentation',
				expires: 'Sep 20 2015',
				status: 'on-progress'
			}]

			db.set('people', people)
			db.set('tasks', tasks)
		})
	})
})