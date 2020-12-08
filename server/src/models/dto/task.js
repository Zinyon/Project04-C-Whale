const {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsString,
  IsDefined,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  MinLength,
  IsDateString,
  ValidateIf,
  IsUUID,
} = require('class-validator');
const errorMessage = require('@models/dto/error-messages');
const { isAfterToday } = require('@utils/validator');

class TaskDto {
  @ValidateIf(o => !!o.id)
  @IsString()
  @IsUUID('4')
  id;

  @IsString({ groups: ['create'] }, { message: errorMessage.wrongProperty('title') })
  @MinLength(1, { groups: ['create'] }, { message: errorMessage.wrongProperty('title') })
  title;

  @IsDateString(
    { strict: true },
    { groups: ['create'], message: errorMessage.wrongProperty('dueDate') },
  )
  @isAfterToday('dueDate', { groups: ['create'], message: errorMessage.beforeDueDate })
  dueDate;

  @IsInt()
  @IsNotEmpty()
  position;

  @IsBoolean()
  @IsNotEmpty()
  isDone;

  @IsString()
  @IsUUID('4')
  parentId;

  @IsString({ groups: ['create'], message: errorMessage.wrongProperty('sectionId') })
  @IsUUID('4', { groups: ['create'], message: errorMessage.wrongProperty('sectionId') })
  sectionId;

  @IsString({ groups: ['create'], message: errorMessage.wrongProperty('projectId') })
  @IsUUID('4', { groups: ['create'], message: errorMessage.wrongProperty('projectId') })
  projectId;

  @IsString()
  @IsUUID('4')
  priorityId;

  @IsUUID('4')
  alarmId;

  @IsArray
  orderedTasks;

  // constructor({ id, title, dueDate, position, isDone }) {
  //   this.id = id;
  //   this.title = title;
  //   this.dueDate = dueDate;
  //   this.position = position;
  //   this.isDone = isDone;
  // }
}

// const task = new TaskDto();
// task.id = 'ff4dd832-1567-4d74-b41d-bd85e96ce329';
// task.title = 'zkzkzk';
// task.dueDate = new Date('2020-12-07');
// task.position = 4;
// task.isDone = true;
// task.parentId = 'ff4dd832-1567-4d74-b41d-bd85e96ce329';

// await validateOrReject(task, { gropus }).catch(errors => {
//   console.log('Promise rejected (validation failed). Errors: ', errors);
// });

// sectionId;

// projectId
// priorityId;
// alarmId;
// orderedTasks

module.exports = TaskDto;
