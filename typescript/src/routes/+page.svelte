<script lang="ts">
	import {
		getLiveLessonClass,
		getLiveLessons,
		getLiveLessonStudentCenter,
		getTeacher
	} from './data.remote';

	function hhmm(date: Date) {
		return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
	}

	function relativeTime(date: Date, suffix: string) {
		const diff = Math.abs(Date.now() - date.getTime());
		const h = Math.floor(diff / 3600000);
		const m = Math.floor((diff % 3600000) / 60000);
		return h >= 1 ? `${h}시간 ${suffix}` : `${m}분 ${suffix}`;
	}
</script>

<div class="p-6">
	<h1 class="mb-4 text-xl font-bold">라이브 수업 일정</h1>

	<table class="w-full text-sm">
		<thead>
			<tr class="border-b bg-gray-50 text-left *:px-3 *:py-2">
				<th>고유번호</th>
				<th>수업명</th>
				<th>과목</th>
				<th>선생님</th>
				<th>센터 / 수강생</th>
				<th>시작</th>
				<th>종료</th>
				<th>상태</th>
			</tr>
		</thead>
		<tbody>
			{#each await getLiveLessons() as lesson (lesson.id)}
				{@const teacher = await getTeacher(lesson.teacherId)}
				{@const class_ = await getLiveLessonClass(lesson.classId)}
				{@const students = await getLiveLessonStudentCenter(lesson.classId)}
				<tr class={['border-b *:px-3 *:py-2', lesson.cancel && 'opacity-40']}>
					<td>{lesson.classId}</td>
					<td>{class_?.className}</td>
					<td>{class_?.subject}</td>
					<td>{teacher?.name}</td>
					<td>{students?.centerName} · {students?.studentCount}명</td>
					<td>{hhmm(lesson.startTime)}</td>
					<td>{hhmm(lesson.endTime)}</td>
					<td>
						{#if lesson.cancel}
							<span class="text-red-500">취소</span>
						{:else if lesson.endTime < new Date()}
							<span class="text-gray-400">{relativeTime(lesson.endTime, '전 종료')}</span>
						{:else if lesson.startTime <= new Date()}
							<span class="text-green-600">진행 중</span>
						{:else}
							<span class="text-blue-500">{relativeTime(lesson.startTime, '후 시작')}</span>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
