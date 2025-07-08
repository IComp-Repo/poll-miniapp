import styles from '@/styles/useGlobal.module.css'

interface StatCardProps {
  title: string
  value: number
  icon?: React.ReactNode
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div
      className={`${styles.cardHover} d-flex flex-column align-items-center justify-content-center p-3 shadow rounded`}
      style={{
        backgroundColor: '#fff',
        width: '220px',
        gap: '8px',
        whiteSpace: 'normal',
      }}
    >
      {icon && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            color: '#E05F00',
          }}
        >
          {icon}
        </div>
      )}

      <p className={`${styles.dashboardTitle} mb-1 text-center`}>{title}</p>
      <h4 className={`${styles.dashboardValue} mb-0`}>{value}</h4>
    </div>
  )
}

export default StatCard
