<script setup lang="ts">
defineEmits(['confirm', 'cancel'])
</script>

<template>
	<div class="modal-overlay animate__animated animate__fadeIn">
		<div class="modal-content animate__animated animate__zoomIn">
			<div class="modal-header">
				<h3 class="modal-title">
					<i class="bi bi-exclamation-triangle"></i>
					Удалить приход?
				</h3>
			</div>

			<div class="modal-body">
				<p class="modal-text">
					Вы действительно хотите удалить этот приход? Это действие нельзя
					отменить, и все связанные данные будут удалены.
				</p>
			</div>

			<div class="modal-footer">
				<button
					class="modal-button modal-button--cancel"
					@click="$emit('cancel')"
				>
					Отмена
				</button>
				<button
					class="modal-button modal-button--confirm"
					@click="$emit('confirm')"
				>
					<i class="bi bi-trash"></i>
					Удалить
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	padding: 20px;
}

.modal-content {
	background: #ffffff;
	border-radius: 12px;
	max-width: 500px;
	width: 100%;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
	padding: 24px 24px 0 24px;
}

.modal-title {
	font-size: 22px;
	font-weight: 700;
	color: #dc3545;
	margin: 0;
	display: flex;
	align-items: center;
	gap: 12px;
}

.modal-title i {
	font-size: 28px;
}

.modal-body {
	padding: 20px 24px;
}

.modal-text {
	color: #495057;
	line-height: 1.6;
	margin: 0;
	font-size: 15px;
}

.modal-footer {
	padding: 0 24px 24px 24px;
	display: flex;
	justify-content: flex-end;
	gap: 12px;
}

.modal-button {
	padding: 10px 24px;
	border: none;
	border-radius: 6px;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	gap: 8px;
}

.modal-button--cancel {
	background: #f8f9fa;
	color: #495057;
	border: 2px solid #dee2e6;
}

.modal-button--cancel:hover {
	background: #e9ecef;
}

.modal-button--confirm {
	background: #dc3545;
	color: #ffffff;
}

.modal-button--confirm:hover {
	background: #bb2d3b;
}

@media (max-width: 576px) {
	.modal-content {
		margin: 20px;
	}

	.modal-footer {
		flex-direction: column-reverse;
	}

	.modal-button {
		width: 100%;
		justify-content: center;
	}
}
</style>
