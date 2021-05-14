const ui_menu = (function(){
	let toggle_menu = function(target){
		let menu_root = target.closest('.menu-root');
		let menu = target.closest('.menu');
		if(!menu_root){return;}
		if(!menu.classList.contains('on')){
			menu_root.querySelectorAll('.menu').forEach(element => {
				if(element.contains(target) && element.classList.contains('menu-has-child')){
					element.classList.add('on');
				}else{
					element.classList.remove('on');
				}
			});
		}else{
			menu.classList.remove('on');
		}
	}
	let close_menu = function(target){
		let element = target.closest('.menu'); 
		if(!element){return;}
		element.classList.remove('on');
	}
	let open_menu = function(target){
		let menu = target.closest('.menu');
		if(!menu){return;}
		let menu_root = target.closest('.menu-root');
		if(!menu_root){return;}
		open_container(target)
		menu_root.querySelectorAll('.menu').forEach(element => {
			if(element.contains(target) && element.classList.contains('menu-has-child')){
				element.classList.add('on');
			}else{
				element.classList.remove('on');
			}
		});
	}
	let close_container = function(target){
		let element = target.closest('.menu-container');
		if(!element){return;}
		element.classList.remove('on');
		element.querySelectorAll('.menu.on').forEach(element => {
			element.classList.remove('on')
		});
	}
	let open_container = function(target){
		let element = target.closest('.menu-container');
		if(!element){return;}
		element.classList.add('on');
	}
	let onclick = function(event){
		let target = event.target;
		if(target.closest('.menu-event-ignore')){ //이벤트 무시 영역
			return;
		}
		if(!target.closest('.menu-container')){ //전체 닫기
			document.querySelectorAll('.menu-container').forEach(element => {
				close_container(element)	
			});
		}
		if(target.classList.contains('menu-label')){
			let menu = target.closest('.menu');
			if(!menu){return;}
			toggle_menu(menu);
		}
		if(target.hasAttribute('data-menu-open')){
			let element = document.querySelector(target.getAttribute('data-menu-open'));
			if(!element){ return;}
			// element.classList.toggle('on');
			open_container(element);
		}
		if(target.hasAttribute('data-menu-dismiss')){
			let container = target.getAttribute('data-menu-dismiss');
			if(container){
				let element = document.querySelector(container);
				if(!element){ return;}
				close_container(element)
			}else{
				close_container(target)
			}
			
		}
		if(target.hasAttribute('data-menu-selectable')){
			select_menu(target)
		}
	}

	let select_menu = function(target){
		let menu_root = target.closest('.menu-root');
		target.classList.add('selected')

		menu_root.querySelectorAll('.menu').forEach(element => {
			if(element.contains(target)){
				element.classList.add('selected')
			}else{
				element.classList.remove('selected')
			}
		});
	}
	let ui_menu = {
		'inited':false,
		'init':function(){
			if(!this.inited){
				document.addEventListener('click',onclick);
				this.initHasChild();
				this.inited = true;
			}
		},
		'initHasChild':function(){
			document.querySelectorAll('.menu').forEach(element => {
				if(element.querySelector(":scope > .menu-box")){
					element.classList.add('menu-has-child')
				}else{
					element.classList.remove('menu-has-child')
				}
				if(element.querySelector(":scope  .menu.selected")){
					element.classList.add('selected')
				}
			})
		},
		"select_menu":select_menu,
		"open_menu":open_menu,
		"close_menu":close_menu,
		"toggle_menu":toggle_menu,
		"close_container":close_container,
		"open_container":open_container,
	}
	return ui_menu ;
})()