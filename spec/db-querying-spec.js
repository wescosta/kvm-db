var _db = require('../db.js')

xdescribe('A db', function(){
	var db

	beforeEach(function(){
		db = new _db()
	})

	it('is most useful when you set objects and arrays of objects as values. Thus you can save and query then later on', function(){
		var _document = {
			id: 'it\'s best to use some sort of UUID - https://en.wikipedia.org/wiki/Universally_unique_identifier',
			description: 'As an object, your document can be whatever you want and can have any property you wish. :)',
			date: 'Aug 12 2015'
		},

		person = {
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
		}
	})
})