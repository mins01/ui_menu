const ui_menu = (function(){
	let hide_all = function(menu_root){
		
	}
	let show = function(target){
		let menu_root = target.closest('.menu-root');
		if(!menu_root){return;}
		if(!target.classList.contains('on')){
			menu_root.querySelectorAll('.menu').forEach(element => {
				if(element.contains(target)){
					element.classList.add('on');
				}else{
					element.classList.remove('on');
				}
			});
		}else{
			target.classList.remove('on');
		}
		
	}
	let onclick = function(event){
		let target = event.target;
		if(target.classList.contains('menu-label')){
			let menu = target.closest('.menu');
			if(!menu){return;}
			show(menu);
		}
	}
	let ui_menu = {
		'inited':false,
		'init':function(){
			document.addEventListener('click',onclick);
			this.initHasChild();
		},
		'initHasChild':function(){
			document.querySelectorAll('.menu').forEach(element => {
				console.log(element);
				if(element.querySelector(":scope > .menu-box")){
					element.classList.add('menu-has-child')
				}else{
					element.classList.remove('menu-has-child')
				}
			})
		}
		
		
	}
	return ui_menu ;
})()