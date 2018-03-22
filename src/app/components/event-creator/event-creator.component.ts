import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '../../services/api.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})
export class EventCreatorComponent implements AfterViewInit {

  @ViewChild('ckEditor') ckeditorElement: ElementRef;
  ckEditor: any;
  ckEditorContent: BehaviorSubject<string>;

  currentUser: User;
  currentMode: string = 'event';

  selectedFiles: FileList;

  registerForm: FormGroup;
  startDateDummyControl: FormControl;
  endDateDummyControl: FormControl;
  startDateControl: FormControl;
  endDateControl: FormControl;
  postContentControl: FormControl;

  modes: Array<CreatorMode> = [
    {value: 'article', viewValue: ''},
    {value: 'event', viewValue: ''},
  ];

  ngAfterViewInit(): void {
    ClassicEditor
      .create( this.ckeditorElement.nativeElement )
      .then( editor => {
        this.ckEditor = editor;
        this.ckEditor.document.on( 'change', ( event, data ) => {
          this.ckEditorContent.next(this.ckEditor.getData());
        });
        console.log('ckEditor initialized', editor);
      } )
      .catch( error => {
        console.error('ckEditor caused error', error);
      } );
  }

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.startDateDummyControl = this.formBuilder.control({value: '', disabled: true});
    this.endDateDummyControl = this.formBuilder.control({value: '', disabled: true});
    this.startDateControl = this.formBuilder.control('', Validators.required);
    this.endDateControl = this.formBuilder.control('', Validators.required);
    this.postContentControl = this.formBuilder.control('', Validators.required);

    this.registerForm = formBuilder.group({
      eventTitle: ['', Validators.required],
      startDateDummy: this.startDateDummyControl,
      startDate: this.startDateControl,
      endDateDummy: this.endDateDummyControl,
      endDate: this.endDateControl,
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      postContent: this.postContentControl
    });

    this.ckEditorContent = new BehaviorSubject<string>('');
    this.ckEditorContent.subscribe((value) => {
      this.postContentControl.setValue(value);
    });

    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });

    translateService.get('event').subscribe((translation) => {
      this.modes.find(mode => mode.value === 'event').viewValue = translation;
    });

    this.startDateDummyControl.valueChanges.subscribe((value) => {
      this.startDateControl.setValue(value);
    });

    this.endDateDummyControl.valueChanges.subscribe((value) => {
      this.endDateControl.setValue(value);
    });

    translateService.onLangChange.subscribe(() => this.changeLanguage());
    this.changeLanguage();
  }

  selectFiles(event): void {
    this.selectedFiles = event.target.files;
    console.log('Created event:', this.selectedFiles);
  }

  onMouseOver(): void {
    console.log('Mouse is over');
  }

  onMouseOut(): void {
    console.log('Mouse is out');
  }

  // todo test only
  progress: { percentage: number } = { percentage: 0 };
  imgurl = 'http://localhost:8080/files/show/tot.jpg';

  imgUrls = [
    'http://localhost:8080/files/show/tot.jpg',
    'http://localhost:8080/files/show/wup.jpg'
  ];

  uploadSelectedFiles(): void {
    console.log('Attempting upload');

    // todo refactor, testing only

    this.progress.percentage = 0;
    let currentFileUpload = this.selectedFiles.item(0);

    this.apiService.upload(currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
        console.log('Uploaded file: ' + currentFileUpload + ' percentage: ' + this.progress.percentage);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        this.imgurl = environment.api_url + event.body;
      }
    });

    this.selectedFiles = undefined;
  }

  changeLanguage(): void {
    this.modes.forEach(mode => {
      this.translateService.get(mode.value).subscribe((translation) => {
        mode.viewValue = translation;
      });
    });
  }

  createEvent(event): void {
    console.log('Created event:', event);
  }

  // todo: move to some service
  hasRole(requiredRole: string): boolean {
    return this.currentUser.role === requiredRole;
  }
}

interface CreatorMode {
  value: string;
  viewValue: string;
}
