import React from 'react';
import { 
  TrendingUpIcon, 
  ClockIcon, 
  DollarSignIcon, 
  UsersIcon,
  CheckCircleIcon,
  AlertCircleIcon
} from 'lucide-react';
import clsx from 'clsx';

const iconMap = {
  trending: TrendingUpIcon,
  clock: ClockIcon,
  dollar: DollarSignIcon,
  users: UsersIcon,
  check: CheckCircleIcon,
  alert: AlertCircleIcon,
};

const iconColors = {
  trending: 'text-primary-600',
  clock: 'text-status-success-600',
  dollar: 'text-status-warning-600',
  users: 'text-status-info-600',
  check: 'text-status-success-600',
  alert: 'text-status-error-600',
};

export const DashboardWidget = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  size = 'medium',
  className
}) => {
  const Icon = iconMap[icon];
  const iconColor = iconColors[icon];

  return (
    <div className={clsx(
      'card-base',
      {
        'col-span-1': size === 'small',
        'col-span-2': size === 'medium',
        'col-span-3': size === 'large',
      },
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-text-tertiary mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUpIcon className={clsx(
                'w-4 h-4 mr-1',
                trend.isPositive ? 'text-status-success' : 'text-status-error transform rotate-180'
              )} />
              <span className={clsx(
                'text-sm font-medium',
                trend.isPositive ? 'text-status-success-text' : 'text-status-error-text'
              )}>
                {Math.abs(trend.value)}%
              </span>
              <span className="text-sm text-text-tertiary ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={clsx(
          'w-12 h-12 rounded-lg flex items-center justify-center',
          iconColor === 'text-primary-600' ? 'bg-primary-100' :
          iconColor === 'text-status-success-600' ? 'bg-status-success-background' :
          iconColor === 'text-status-warning-600' ? 'bg-status-warning-background' :
          iconColor === 'text-status-info-600' ? 'bg-status-info-background' :
          'bg-neutral-100'
        )}>
          <Icon className={clsx('w-6 h-6', iconColor)} />
        </div>
      </div>
    </div>
  );
};