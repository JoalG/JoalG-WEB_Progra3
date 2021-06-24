import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-exercise',
  templateUrl: './form-exercise.component.html',
  styleUrls: ['./form-exercise.component.css']
})
export class FormExerciseComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  exerciseForm!: FormGroup;
  @Input() exerciseCode: string = "none";


  ngOnInit(): void {
    this.createExerciseForm();
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

  createExerciseForm(){
    if(this.exerciseCode !== "none"){
      // Se inserta con información
      // Habria que hacerle get al firebase con el exerciseCode
    }
    // Se crea el form vacio
    else{
      this.exerciseForm = this.fb.group({
        call: ['', Validators.required],
        level: ['', Validators.required],
        name: ['', Validators.required],
        section: ['', Validators.required],
        details: ['', Validators.required],
        file: [''],
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
}
