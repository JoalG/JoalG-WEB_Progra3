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
    console.log(this.inputs.controls)
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
            call: [''],
            result: [''],
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

  get examples(){
    return <FormArray>this.exerciseForm.get('examples');
  }

  get inputs(){
    return <FormArray>this.exerciseForm.get('solution')?.get('inputs');
  }

  get outputs(){
    return <FormArray>this.exerciseForm.get('solution')?.get('outputs');
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
        call: [''],
        result: [''],
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
