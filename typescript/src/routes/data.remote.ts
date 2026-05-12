import { query } from '$app/server';
import { string } from 'valibot';

export const getLiveLessons = query(async () => {
	const now = Date.now();
	return [
		{
			id: 'l1',
			classId: 'c1',
			teacherId: 't1',
			startTime: new Date(now - 7200000),
			endTime: new Date(now - 3600000),
			cancel: false
		},
		{
			id: 'l2',
			classId: 'c2',
			teacherId: 't2',
			startTime: new Date(now - 1800000),
			endTime: new Date(now + 1800000),
			cancel: false
		},
		{
			id: 'l3',
			classId: 'c3',
			teacherId: 't1',
			startTime: new Date(now + 3600000),
			endTime: new Date(now + 7200000),
			cancel: true
		},
		{
			id: 'l4',
			classId: 'c1',
			teacherId: 't3',
			startTime: new Date(now + 10800000),
			endTime: new Date(now + 14400000),
			cancel: false
		}
	];
});

const liveLessonClassMap = new Map([
	['c1', { className: '수학 기초반', subject: '수학' }],
	['c2', { className: '영어 심화반', subject: '영어' }],
	['c3', { className: '과학 탐구반', subject: '과학' }]
]);

export const getLiveLessonClass = query.batch(string(), async () => {
	return (classId: string) => liveLessonClassMap.get(classId);
});

const teacherMap = new Map([
	['t1', { name: '김민준' }],
	['t2', { name: '이서연' }],
	['t3', { name: '박지호' }]
]);

export const getTeacher = query.batch(string(), async () => {
	return (teacherId: string) => teacherMap.get(teacherId);
});

const liveLessonStudentCenterMap = new Map([
	['c1', { studentCount: 12, centerName: '강남센터' }],
	['c2', { studentCount: 8, centerName: '서초센터' }],
	['c3', { studentCount: 15, centerName: '송파센터' }]
]);

export const getLiveLessonStudentCenter = query.batch(string(), async () => {
	return (classId: string) => liveLessonStudentCenterMap.get(classId);
});
