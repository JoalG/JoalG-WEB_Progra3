import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { UserService } from 'src/app/services/user.service';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { FileInfo } from 'src/app/models/file-info.model';
import { FileService } from 'src/app/services/file.service';


@Component({
  selector: 'app-form-exercise',
  templateUrl: './form-exercise.component.html',
  styleUrls: ['./form-exercise.component.css']
})
export class FormExerciseComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    private userService: UserService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private fileService: FileService
  ) { 
    this.exerciseCode = <string>route.snapshot.paramMap.get('exerciseCode');
    this.exerciseCode==null?this.exerciseCode="none":false;
  }

  exerciseForm!: FormGroup;
  exerciseCode: string = "none";
  exercise!: Exercise;
  file: any;
  fileURL: any;
  fileSizeLimit: number = 26214400;
  fileName: string = 'Ningún Archivo';
  fileURLExists: boolean = false;
  isDataLoaded:boolean = false;
  fileInfo!: FileInfo;

  solutionCodeModel: CodeModel = {
    language: 'python',
    uri: '',
    value: '',
    dependencies: ['@types/node', '@ngstack/translate', '@ngstack/code-editor']
  };

  options = {
    lineNumbers: true,
    contextmenu: false,
    minimap: {
       enabled: false
    },
    scrollBeyondLastLine:false,
    fontSize: 16,
    selectionClipboard: true
  };
  /*
  exercise: Exercise =

    {
      "call":"arbol (centro, hijoizquierdo, hijoderecho)",
      "creator":"Diego Mora",
      "code":"00061",
      "examples":[
        {
            "call":"arbol(100,[],[])",
            "result":"100",
            "comment":"En este caso este árbol aún no tiene hijos"
        },
        {
            "call":"arbol(100,[90,80],[110,105])",
            "result":"[10, [5, 4, 6], [7, 8, 9]]",
            "comment":""
        },
        {
            "call":"arbol(10,[5,4,6],[7,8,9])",
            "result":"[10, [5, 4, 6], [7, 8, 9]]",
            "comment":""
        }
      ],
      "solution":{
        "outputs":[
            {
              "name":"Una lista",
              "type":"Lista que representa un árbol"
            }
        ],
        "code":"def arbol (centro, hijoizquierdo, hijoderecho):\n    if hijoizquierdo == [] and hijoderecho == []:\n        return centro\n    else:\n        return [centro] + [hijoizquierdo] + [hijoderecho]\n\n",
        "inputs":[
            {
              "name":"centro",
              "type":"Un valor para la raiz"
            },
            {
              "name":"hijoizquierdo",
              "type":"Una lista de un subarbol izquierdo"
            },
            {
              "name":"hijoderecho",
              "type":"Una lista de un subarbol derecho"
            }
        ]
      },
      "level":"1",
      "created":"2021-06-17",
      "name":"Árbol",
      "section":"Árboles",
      "details":"Realice una función que retorne una lista que simboliza un árbol, por lo que se conforma por hijo derecha e izquierdo y el valor que simboliza la raíz."
    }
  */

  ngOnInit(): void {
    this.createExerciseForm();

    if(this.exerciseCode !== "none"){

      this.exerciseService.getExerciseByKey(this.exerciseCode).then((data)=>{
        this.exercise = <Exercise>data;
        this.createFilledExerciseForm();
        
        this.solutionCodeModel = {
          language: 'python',
          uri: '',
          value: this.exercise.solution.code,
          dependencies: ['@types/node', '@ngstack/translate', '@ngstack/code-editor']
        };

        this.isDataLoaded = true
        console.log(this.exercise)
  
      }).catch((data)=>console.log(data))


      this.fileService.getFileInfo(this.exerciseCode)
      .then((data) =>{
        this.fileInfo = <FileInfo>data
        this.fileURLExists = true;
      })
      .catch(err =>{
        this.fileInfo = {
          name: '',
          URL: '',
          path: ''
        }
        this.fileURLExists = false;
      })
    }
    else{
      this.isDataLoaded = true
    }
  }

  // Get for exerciseForm

  get examples(){
    return <FormArray>this.exerciseForm.get('examples');
  }

  get solution(){
    return <FormGroup>this.exerciseForm.get('solution');
  }

  get inputs(){
    return <FormArray>this.exerciseForm.get('solution')?.get('inputs');
  }

  get outputs(){
    return <FormArray>this.exerciseForm.get('solution')?.get('outputs');
  }

  get code(){
    return <FormControl>this.exerciseForm.get('solution')?.get('code');
  }

  // Gets for validations

  get callInvalid(){
    return this.exerciseForm.get('call')?.invalid && this.exerciseForm.get('call')?.touched;
  }

  get levelInvalid(){
    return this.exerciseForm.get('level')?.invalid && this.exerciseForm.get('level')?.touched;
  }

  get nameInvalid(){
    return this.exerciseForm.get('name')?.invalid && this.exerciseForm.get('name')?.touched;
  }

  get sectionInvalid(){
    return this.exerciseForm.get('section')?.invalid && this.exerciseForm.get('section')?.touched;
  }

  get detailsInvalid(){
    return this.exerciseForm.get('details')?.invalid && this.exerciseForm.get('details')?.touched;
  }

  get codeInvalid(){
    return this.exerciseForm.get('solution')?.get('code')?.invalid && this.exerciseForm.get('solution')?.get('code')?.touched;
  }

  exampleCallInvalid(i: number){
    return this.examples.controls[i].get('call')?.invalid && this.examples.controls[i].get('call')?.touched;
  }

  exampleResultInvalid(i: number){
    return this.examples.controls[i].get('result')?.invalid && this.examples.controls[i].get('result')?.touched;
  }

  inputNameInvalid(i: number){
    return this.inputs.controls[i].get('name')?.invalid && this.inputs.controls[i].get('name')?.touched;
  }

  inputTypeInvalid(i: number){
    return this.inputs.controls[i].get('type')?.invalid && this.inputs.controls[i].get('type')?.touched;
  }

  outputNameInvalid(i: number){
    return this.outputs.controls[i].get('name')?.invalid && this.outputs.controls[i].get('name')?.touched;
  }

  outputTypeInvalid(i: number){
    return this.outputs.controls[i].get('type')?.invalid && this.outputs.controls[i].get('type')?.touched;
  }


  createFilledExerciseForm(){
      this.exerciseForm = this.fb.group({
        call: [this.exercise.call, Validators.required],
        level: [this.exercise.level, Validators.required],
        name: [this.exercise.name, Validators.required],
        section: [this.exercise.section, Validators.required],
        details: [this.exercise.details, Validators.required],
        examples: this.fb.array([]),
        solution: this.fb.group({
          inputs: this.fb.array([]),
          outputs: this.fb.array([]),
          code: [this.exercise.solution.code, Validators.required]
        })
      })
      this.exercise.examples.forEach(element => {
        this.examples.push(
          this.fb.group({
            call: [element.call, Validators.required],
            result: [element.result, Validators.required],
            comment: [element.comment]
          })
        )
      });
      this.exercise.solution.inputs.forEach(element => {
        this.inputs.push(
          this.fb.group({
            name: [element.name, Validators.required],
            type: [element.type, Validators.required]
          })
        )
      });
      this.exercise.solution.outputs.forEach(element => {
        this.outputs.push(
          this.fb.group({
            name: [element.name, Validators.required],
            type: [element.type, Validators.required]
          })
        )
      });
  }

  createExerciseForm(){
    this.exerciseForm = this.fb.group({
      call: ['', Validators.required],
      level: ['', Validators.required],
      name: ['', Validators.required],
      section: ['', Validators.required],
      details: ['', Validators.required],
      examples: this.fb.array([
        this.fb.group({
          call: ['', Validators.required],
          result: ['', Validators.required],
          comment: ['']
        })
      ]),
      solution: this.fb.group({
        inputs: this.fb.array([
          this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required]
          })
        ]),
        outputs: this.fb.array([
          this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required]
          })
        ]),
        code: ['', Validators.required]
      })
    })
  }

  getExampleGroup(i: number){
    return <FormGroup>this.examples.controls[i];
  }

  getInputGroup(i: number){
    return <FormGroup>this.inputs.controls[i];
  }

  getOutputGroup(i: number){
    return <FormGroup>this.outputs.controls[i];
  }

  addExample(){
    this.examples.push(
      this.fb.group({
        call: ['', Validators.required],
        result: ['', Validators.required],
        comment: ['']
      })
    )
  }

  removeExample(i: number){
    this.examples.removeAt(i);
  }

  addInput(){
    this.inputs.push(
      this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required]
      })
    )
  }
  
  removeInput(i: number){
    this.inputs.removeAt(i);
  }

  addOutput(){
    this.outputs.push(
      this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required]
      })
    )
  }
  
  removeOutput(i: number){
    this.outputs.removeAt(i);
  }

  saveExercise(){
    if(this.exerciseForm.invalid || this.fileInvalid()){
      Object.values(this.exerciseForm.controls).forEach(control =>{

        // If example
        if(control instanceof FormArray){
          for (let i = 0; i < control.length; i++) {
            this.getExampleGroup(i).markAllAsTouched();
          }
        }

        // if not solution
        if(control instanceof FormControl){
          control.markAsTouched();
        }
      })

      // for solution
      for (let i = 0; i < this.inputs.length; i++) {
        this.getInputGroup(i).markAllAsTouched();
      }
      for (let i = 0; i < this.outputs.length; i++) {
        this.getOutputGroup(i).markAllAsTouched();
      }
      this.code.markAsTouched();
    }
    else{
      // save new exercise
      if(this.exerciseCode === "none"){
        this.exercise = {
          code: '',
          creator: this.userService.readUsernameToken(),
          created: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
          ...this.exerciseForm.value
        }
        this.exerciseService.saveNewExercise(this.exercise, this.file, this.fileInfo);
      }
      // update exercise
      else{
        this.exercise = {
          code: this.exercise.code,
          created: this.exercise.created,
          creator: this.exercise.creator,
          ...this.exerciseForm.value
        }
        this.exerciseService.updateExercise(this.exercise, this.exerciseCode, this.file, this.fileInfo);
      }
    }
  }

  setFile($event:any){

    this.file = $event.target.files[0];

    if(typeof this.file === 'undefined'){
      this.fileName = 'Nigún archivo'
    }
    else{
      this.fileName = this.file.name;
    }
    console.log(this.file);
  }

  fileInvalid(){
    if(typeof this.file !== 'undefined'){
      return this.file.size > this.fileSizeLimit;
    }
    return false;
  }

  onCodeChanged(value: any) {
    this.code.setValue(value);
  }

}