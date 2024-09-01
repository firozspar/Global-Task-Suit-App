import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

const TaskCard = ({ task }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{task.TaskName}</Typography>
        <Typography color="textSecondary">{task.TaskDesc}</Typography>
        <Typography color="textSecondary">Due Date: {task.DueDate}</Typography>
        <Typography color="textSecondary">Assigned To: {task.AssignedTo}</Typography>
        <Typography color="textSecondary">Status: {task.Status}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
