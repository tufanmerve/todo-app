import React from 'react';
import { Formik, Form, Field } from 'formik';
import validationsSchema from './validations';
import { useTodo } from '../../contexts/TodoContext';


function NewTodoForm() {
  const { addTodo } = useTodo();

  return (
    <Formik
      initialValues={{
        text: ''
      }}
      onSubmit={(values, bag) => {

        console.log(JSON.stringify(values));
        addTodo(values.text)

        bag.resetForm();
      }}
      validationSchema={validationsSchema}
    >
      <Form>
        <Field className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          id="text"
          name="text" />
      </Form>
    </Formik>

  )
}

export default NewTodoForm