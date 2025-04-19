import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function CategorySection({ categories = [] }) {
  const { t } = useTranslation('common');
  
  // If no categories are provided, use default ones
  const defaultCategories = [
    { id: 'electronics', name: t('electronics'), icon: 'device-mobile' },
    { id: 'jewelery', name: t('jewelry'), icon: 'sparkles' },
    { id: "men's clothing", name: t('clothing'), icon: 'shirt' },
    { id: "women's clothing", name: t('clothing'), icon: 'shirt' },
  ];
  
  const displayCategories = categories.length > 0 
    ? categories.map(category => ({
        id: category,
        name: t(category.replace(/\s+/g, '')) || category,
        icon: getCategoryIcon(category),
      }))
    : defaultCategories;
  
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {displayCategories.map((category) => (
        <Link 
          key={category.id}
          href={`/categories/${category.id}`}
          className="group flex flex-col items-center rounded-lg p-6 text-center transition-colors hover:bg-primary hover:text-white"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-lightest text-primary transition-colors group-hover:bg-white/20 group-hover:text-white dark:bg-neutral-dark">
            {renderCategoryIcon(category.icon)}
          </div>
          <h3 className="text-lg font-medium">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
}

// Helper function to get appropriate icon for each category
function getCategoryIcon(category) {
  switch (category.toLowerCase()) {
    case 'electronics':
      return 'device-mobile';
    case 'jewelery':
      return 'sparkles';
    case "men's clothing":
      return 'shirt';
    case "women's clothing":
      return 'shirt';
    default:
      return 'shopping-bag';
  }
}

// Render the SVG icon based on category
function renderCategoryIcon(icon) {
  switch (icon) {
    case 'device-mobile':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      );
    case 'shirt':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
        </svg>
      );
    case 'shopping-bag':
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      );
  }
}
