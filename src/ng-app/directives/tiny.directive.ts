import {Directive, Input, Output, ElementRef, SimpleChange, OnInit, AfterViewInit, OnDestroy, OnChanges, EventEmitter} from '@angular/core';
declare var tinymce: any;

@Directive({
	inputs: ['htmlEditor'],
	selector: '[htmlEditor]'
	})

export class EditorDirective implements AfterViewInit, OnDestroy, OnChanges {

	private editor:any;
	@Input() htmlEditor: boolean;
	@Output() onEditorChange = new EventEmitter<any>();
	
	constructor(private el:ElementRef){ }
	
	ngOnChanges(changes: {[propKey: string]: SimpleChange}){
		if (typeof changes['htmlEditor'] !== "undefined" && !changes['htmlEditor'].isFirstChange()) {
			this.toggleEditor();
		}
	}
	
	ngAfterViewInit() {
		this.toggleEditor();
	}
	
	private toggleEditor() {
		if (this.htmlEditor){
			tinymce.init({
				target: this.el.nativeElement,
				theme: 'inlite',
				plugins: 'visualblocks',
				insert_toolbar: '',
				selection_toolbar: '',
				schema: 'html5',
				inline: true,
				visualblocks_default_state: true,
				setup: editor => {
					this.editor = editor;
					var orig_shortcuts_add = this.editor.shortcuts.add;
					this.editor.shortcuts.add = (pattern, desc, cmdFunc, scope) => orig_shortcuts_add(pattern, desc, function () {}, scope);
					this.editor.on( 'keydown', (event) => {
						if (event.keyCode == 13) {
							event.preventDefault();
							event.stopPropagation();
							return false
						}
					});
					this.editor.on( 'blur', (event) => {
						const content = this.editor.getContent({format : 'text'});
						this.onEditorChange.emit({"content": content, "event": event});
					});
					this.editor.on( 'GetContent', (args) => {
						if (args.format == 'text'){
							args.content = args.content.replace(/\n/g, '');
						}
					});
				}
			});
		}
		else {
			tinymce.remove(this.editor);
		}
	}
	
	ngOnDestroy(){
		tinymce.remove(this.editor);
	}
}