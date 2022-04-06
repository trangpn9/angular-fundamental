import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ISession, restrictedWords } from "./../shared";

@Component({
  selector: 'create-session',
  templateUrl: './create-session.component.html',
  styles: [`
    em {float: right; color: #E05C65;}
    .error input, .error select, .error textarea { background-color: #E3C3E5 }
    .error ::-webkit-input-placeholder { color: #999999 }
    .error ::-moz-placeholder { color: #999999 }
    .error :-webkit-input-placeholder { color: #999999 }
    .error :ms-input-placeholder { color: #999999 }
  `]
})

export class CreateSessionComponent implements OnInit {
  @Output() saveNewSession = new EventEmitter();
  @Output() handleCancel = new EventEmitter();

  //Declaration variables used bilding data into HTML
  newSessionForm!:FormGroup;
  name:FormControl | undefined;
  presenter:FormControl | undefined;
  duration:FormControl | undefined;
  level:FormControl | undefined;
  abstract:FormControl | undefined;

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  cancel() {
    this.handleCancel.emit();
  }

  saveSession(formValues:any) {
    // console.log('Value: ', formValues);
    let session: ISession = {
      id: 99,
      name: formValues.name,
      presenter: formValues.presenter,
      duration: formValues.duration,
      level: formValues.level,
      abstract: formValues.abstract,
      voters: []
    }
    this.saveNewSession.emit(session);
    // console.log('Check session: ', session);
  }
}