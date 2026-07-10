import useCountUp from '../../hooks/useCountUp';

export default function AnimatedCounter({ end, suffix = '', duration = 2000, label = '' }) {
  const { count, ref } = useCountUp(end, duration);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text">
        {count}{suffix}
      </div>
      {label && <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{label}</p>}
    </div>
  );
}
