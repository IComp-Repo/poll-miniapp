import styles from '@/styles/useGlobal.module.css'

interface StatCardProps {
  title: string
  value?: number | string   // agora é opcional
  icon?: React.ReactNode
  onClick?: () => void      // permite clicar no card
}

const StatCard = ({ title, value, icon, onClick }: StatCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.cardHover} d-flex flex-column align-items-center justify-content-center p-3 shadow rounded cursor-pointer`}
      style={{
        backgroundColor: '#fff',
        width: '220px',
        gap: '8px',
        whiteSpace: 'normal',
        transition: 'transform 0.2s ease',
      }}
    >
      {icon && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ color: '#E05F00' }}
        >
          {icon}
        </div>
      )}

      <p className={`${styles.dashboardTitle} mb-1 text-center`}>{title}</p>

      {value !== undefined && (
        <h4 className={`${styles.dashboardValue} mb-0`}>{value}</h4>
      )}
    </div>
  )
}

export default StatCard
