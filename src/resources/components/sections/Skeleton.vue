<template>

	<div :class="cn([
		'flex flex-col space-y-8',
	])">
		<!-- Welcoming text -->
		<div :class="cn([ 'flex flex-col space-y-2', ])">
			<figure
				v-for="i in 3"
				:key="i"
				:class="cn([
					'skeleton skeleton-text-base',
					i === 1 && 'w-6/10',
					i === 2 && 'w-8/10',
					i === 3 && 'w-4/10',
				])"
			></figure>
		</div>
		<div :class="cn([ 'flex flex-col space-y-6', ])">
			<!-- How it works title -->
			<div :class="cn([ 'flex flex-row justify-center', 'w-full', ])">
				<figure
					:class="cn([
						'skeleton skeleton-text-h1',
						'w-2/10',
					])"
				></figure>
			</div>
			<!-- How it works title -->
			<div :class="cn([ 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4', ])">
				<div
					v-for="i in 3"
					:key="i"
					:class="cn([ 'flex flex-col space-y-6', 'w-full', ])"
				>
					<figure
						:class="cn([
							'skeleton',
							'w-full h-75',
						])"
					></figure>
					<Divider :class="cn([ 'bg-gray-light', ])" />
					<div :class="cn([ 'flex flex-col space-y-2', 'px-6', ])">
						<figure
							v-for="i in 3"
							:key="i"
							:class="cn([
								'skeleton skeleton-text-base',
								i === 1 && 'w-6/10',
								i === 2 && 'w-8/10',
								i === 3 && 'w-4/10',
							])"
						></figure>
					</div>
				</div>
			</div>
		</div>
		<Divider :class="cn([ 'bg-gray-light', ])" />
		<div :class="cn([ 'flex flex-col space-y-6', ])">
			<!-- Contracts' title -->
			<div :class="cn([ 'flex flex-row justify-center', 'w-full', ])">
				<figure
					:class="cn([
						'skeleton skeleton-text-h1',
						'w-2/10',
					])"
				></figure>
			</div>
			<!-- Contracts' description -->
			<div :class="cn([ 'flex flex-col space-y-2', ])">
				<figure
					v-for="i in 3"
					:key="i"
					:class="cn([
						'skeleton skeleton-text-base',
						i === 1 && 'w-9/10',
						i === 2 && 'w-7/10',
						i === 3 && 'w-3/10',
					])"
				></figure>
			</div>
			<!-- Contracts' cards -->
			<div :class="cn([ 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4', ])">
				<div
					v-for="i in 3"
					:key="i"
					:class="cn([ 'flex flex-col space-y-6', 'w-full', ])"
				>
					<figure
						:class="cn([
							'skeleton',
							'w-full h-75',
						])"
					></figure>
					<Divider :class="cn([ 'bg-gray-light', ])" />
					<div :class="cn([ 'flex flex-col space-y-2', 'px-6', ])">
						<figure
							v-for="i in 3"
							:key="i"
							:class="cn([
								'skeleton skeleton-text-base',
								i === 1 && 'w-6/10',
								i === 2 && 'w-8/10',
								i === 3 && 'w-4/10',
							])"
						></figure>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script lang="ts" setup>

	import { cn, formatPrice } from '@/utils';

</script>