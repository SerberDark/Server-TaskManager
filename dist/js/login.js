;(function ($) {
	class Login {
		constructor() {
			this._form = document.forms['loginForm'];
			this._allInputReq = document.querySelectorAll('.required');
			this._inputSavePass = this._form.elements['save-password'];
			this._sendFormBtn = this._form.elements['send-form'];
			this._canSend = true;
			this._formData = {};
			this.regExp = {
				login: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				password: /\S+/,
			}
		}

		init() {
			var self = this;

			this.checkToken();

			if (this._form === undefined || this._allInputReq === undefined || this._inputSavePass === undefined) {
				console.error('Form elements undefined');
			} else {
				this.formEvents(self);
			}
		}
		checkToken(){
			localStorage.getItem('taskToken') || sessionStorage.getItem('taskToken') ?
				window.location = '/task' : false;
		}

		formEvents(self) {
			this._form.addEventListener('submit', function (e) {
				e.preventDefault();
				this._canSend = true;
				self._formData = {};
				self._allInputReq.forEach(input => {
					if(!self.regExp[input.name].test(input.value)){
						input.classList.add('error');
						this._canSend = false;
					} else {
						input.classList.remove('error');
						self._formData[input.name] = input.value;
					}
				});
				// генерируем переменную в которую передаем строку
				console.log(self._formData, self._canSend);
				self._canSend ? self.sendFormAjax(self._formData, self) : console.error('input regexp test error');
			})
		}

		sendFormAjax(data, self) {
			$.ajax({
				method: 'POST',
				data: JSON.stringify(data),
				contentType: 'application/json',
				success: function (res) {
					console.log(res);
					self._inputSavePass.checked ?
						localStorage.setItem('taskToken', res._id) :
						sessionStorage.setItem('taskToken', res._id);

					window.location = '/task';
				},
				error: function (err) {

				}
			})
		}
		static generateToken() {

		}
	}

	var newLogin = new Login('some value');
	newLogin.init();
})(jQuery);