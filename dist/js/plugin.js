;(function ($) {
	$(window).on('load', function (e) {
		let taskLink = $('.toggle-task-list a');
		let taskContent = $('.task-content');
		let taskHeader = $('.task-header');
		let addTaskBtn = $('.add-task');
		let overLay = $('.overlay');
		let editTaskBlock = $('.edit-task');



		function tabTask(e) {
				e.preventDefault();
				// Человек кликает по ссылкам в верху
				// 1 Получить значенте href
			let activeBlock = $(this).attr('href');
				// 2. Нужно убрать класс актив и поставить на который кликнули
			taskLink.removeClass('active');
			taskContent.removeClass('active');
				// 3. повесить клас на текущий task-content и link
			$(this).addClass('active');
			$(activeBlock).addClass('active');

		}

		function taskAccordion(e) {
			if (!$(e.target).hasClass('icon-cancel')){
				let parentTask = $(this).closest('.task');
				let taskContentWrap = $(parentTask).find('.task-content-wrap');

				if ($(parentTask).hasClass('open')){
					$(taskContentWrap).slideUp(500, function () {
						$(parentTask).removeClass('open');
					});

				} else{
					$(taskContentWrap).slideDown(500, function () {
						$(parentTask).addClass('open');
					});
				}
			}
		}

		function openEditBlock(e) {
			$([overLay, editTaskBlock]).toggleClass('open');
		}

		taskLink.on('click', tabTask);
		taskHeader.on('click', taskAccordion);
		addTaskBtn.on('click', openEditBlock);
		overLay.on('click', openEditBlock);
	})
})(jQuery);