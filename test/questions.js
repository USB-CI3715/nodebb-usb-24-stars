'use strict';

const assert = require('assert');
const helpers = require('./helpers');

const questions = require('../src/topics');
const user = require('../src/user');
const groups = require('../src/groups');
const categories = require('../src/categories');

describe('Questions', () => {
	let question;
	let categoryObj;
	let adminUid;
	let adminJar;
	let csrf_token;
	let fooUid;

	before(async () => {
		adminUid = await user.create({ username: 'admin', password: '123456' });
		fooUid = await user.create({ username: 'foo' });
		await groups.join('administrators', adminUid);
		const adminLogin = await helpers.loginUser('admin', '123456');
		adminJar = adminLogin.jar;
		csrf_token = adminLogin.csrf_token;

		categoryObj = await categories.create({
			name: 'Test Category',
			description: 'Test category created by testing script',
		});
		question = {
			userId: adminUid,
			categoryId: categoryObj.cid,
			title: 'Test Question Title',
			content: 'The content of test question',
			courseTag: 'Test-course-tag',
		};
	});

	it('should create a new question with proper parameters', (done) => {
		questions.post({
			uid: question.userId,
			title: question.title,
			content: question.content,
			cid: question.categoryId,
			courseTag: question.courseTag,
		}, (err, result) => {
			assert.ifError(err);
			assert(result);
			question.tid = result.topicData.tid;
			done();
		});
	});

	it('should fail to create new question with empty title', (done) => {
		questions.post({ uid: fooUid, title: '', content: question.content, cid: question.categoryId, courseTag: question.courseTag }, (err) => {
			assert.ok(err);
			done();
		});
	});

	it('should fail to create new question with less than 3 characters in title', (done) => {
		questions.post({ uid: fooUid, title: 'tt', content: question.content, cid: question.categoryId, courseTag: question.courseTag }, (err) => {
			assert.ok(err);
			done();
		});
	});

	it('should fail to create new question with empty content', (done) => {
		questions.post({ uid: fooUid, title: question.title, content: '', cid: question.categoryId, courseTag: question.courseTag }, (err) => {
			assert.ok(err);
			done();
		});
	});

	it('should fail to create new question with less than 8 characters in title', (done) => {
		questions.post({ uid: fooUid, title: question.title, content: '1234567', cid: question.categoryId, courseTag: question.courseTag }, (err) => {
			assert.ok(err);
			done();
		});
	});

	it('should get the course tag of a question by its tid', (done) => {
		questions.getTopicField(question.tid, 'courseTag', (err, courseTag) => {
			assert.ifError(err);
			assert.equal(courseTag, question.courseTag);
			done();
		});
	});
});
