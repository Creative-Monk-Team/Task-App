import React, { useState } from 'react';
import { 
  PlusIcon,
  CalendarIcon,
  UsersIcon,
  ClockIcon,
  MessageSquareIcon,
  PaperclipIcon,
  AlertCircleIcon
} from 'lucide-react';
import { Task, TaskStatus } from '../../types/tasks';
import { TaskDetailModal } from './TaskDetailModal';
import clsx from 'clsx';

interface TaskBoardProps {
  tasks: (Task & {
    list?: any;
    folder?: any;
    space?: any;
  })[];
}

const statusColumns: { status: TaskStatus; label: string; color: string }[] = [
  { status: 'todo', label: 'To Do', color: 'bg-gray-100' },
  { status: 'in_progress', label: 'In Progress', color: 'bg-blue-100' },
  { status: 'internal_review', label: 'Internal Review', color: 'bg-orange-100' },
  { status: 'in_revision', label: 'In Revision', color: 'bg-yellow-100' },
  { status: 'client_review', label: 'Client Review', color: 'bg-purple-100' },
  { status: 'blocked', label: 'Blocked', color: 'bg-red-100' },
  { status: 'approved', label: 'Approved', color: 'bg-green-100' },
  { status: 'complete', label: 'Complete', color: 'bg-green-200' },
];

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'p1':
        return 'border-l-red-500';
      case 'p2':
        return 'border-l-orange-500';
      case 'p3':
        return 'border-l-yellow-500';
      case 'p4':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: Date) => {
    return dueDate < new Date();
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      // Update task status logic would go here
      console.log(`Moving task ${draggedTask.id} to ${newStatus}`);
    }
    setDraggedTask(null);
  };

  const getTasksForStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <>
      <div className="flex space-x-6 overflow-x-auto pb-6">
        {statusColumns.map((column) => {
          const columnTasks = getTasksForStatus(column.status);
          
          return (
            <div
              key={column.status}
              className="flex-shrink-0 w-80"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.status)}
            >
              {/* Column Header */}
              <div className={clsx(
                'rounded-t-lg p-4 border-b-2',
                column.color,
                column.status === 'blocked' ? 'border-red-300' :
                column.status === 'complete' ? 'border-green-300' :
                'border-gray-300'
              )}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {column.label}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
                      {columnTasks.length}
                    </span>
                    <button className="text-gray-500 hover:text-gray-700 p-1">
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Column Content */}
              <div className="bg-gray-50 rounded-b-lg min-h-96 p-4 space-y-3">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onClick={() => setSelectedTask(task)}
                    className={clsx(
                      'bg-white rounded-lg border-l-4 p-4 shadow-sm hover:shadow-md cursor-pointer transition-shadow',
                      getPriorityColor(task.priority),
                      draggedTask?.id === task.id ? 'opacity-50' : ''
                    )}
                  >
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm leading-tight">
                        {task.title}
                      </h4>
                      {task.status === 'blocked' && (
                        <AlertCircleIcon className="w-4 h-4 text-red-500 flex-shrink-0 ml-2" />
                      )}
                    </div>

                    {/* Task Description */}
                    {task.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    {/* Project Info */}
                    <div className="flex items-center mb-3">
                      {task.space && (
                        <div 
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: task.space.color }}
                        />
                      )}
                      <span className="text-xs text-gray-500 truncate">
                        {task.list?.name} • {task.folder?.clientName || 'Internal'}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {task.progress > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {task.tags.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{task.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Task Footer */}
                    <div className="flex items-center justify-between">
                      {/* Assignees */}
                      <div className="flex -space-x-1">
                        {task.assignees.slice(0, 3).map((assignee, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white"
                            title={`User ${assignee}`}
                          >
                            <span className="text-white text-xs font-medium">
                              {assignee}
                            </span>
                          </div>
                        ))}
                        {task.assignees.length > 3 && (
                          <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center border-2 border-white">
                            <span className="text-white text-xs">
                              +{task.assignees.length - 3}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Due Date */}
                      {task.dueDate && (
                        <div className={clsx(
                          'flex items-center text-xs',
                          isOverdue(task.dueDate) && task.status !== 'complete'
                            ? 'text-red-600 font-medium'
                            : 'text-gray-500'
                        )}>
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          {formatDate(task.dueDate)}
                        </div>
                      )}
                    </div>

                    {/* Activity Indicators */}
                    {(task.comments.length > 0 || task.attachments.length > 0 || task.timeTracked > 0) && (
                      <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-gray-100">
                        {task.comments.length > 0 && (
                          <div className="flex items-center text-xs text-gray-500">
                            <MessageSquareIcon className="w-3 h-3 mr-1" />
                            {task.comments.length}
                          </div>
                        )}
                        {task.attachments.length > 0 && (
                          <div className="flex items-center text-xs text-gray-500">
                            <PaperclipIcon className="w-3 h-3 mr-1" />
                            {task.attachments.length}
                          </div>
                        )}
                        {task.timeTracked > 0 && (
                          <div className="flex items-center text-xs text-gray-500">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            {task.timeTracked}h
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Task Button */}
                <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                  <PlusIcon className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onTaskUpdated={(updatedTask) => {
            setSelectedTask(updatedTask);
          }}
        />
      )}
    </>
  );
};