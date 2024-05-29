export function groupPostsByDate(posts) {
  const grouped = {
    today: [],
    yesterday: [],
    thisWeek: [],
    lastWeek: [],
    lastMonth: [],
    months: {}
  };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000); // 24 * 60 * 60 * 1000
  const lastWeek = new Date(today.getTime() - 7 * 86400000);
  const thisWeekStart = new Date(today.getTime() - today.getDay() * 86400000);
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

  posts?.forEach(post => {
    const postDate = new Date(post.attributes?.date);
    const postDateStart = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());

    if (postDateStart.getTime() === today.getTime()) {
      grouped.today.push(post);
    } else if (postDateStart.getTime() === yesterday.getTime()) {
      grouped.yesterday.push(post);
    } else if (postDateStart > lastWeek && postDateStart < today) {
      grouped.thisWeek.push(post);
    } else if (postDateStart > thisWeekStart && postDateStart < today) {
      grouped.thisWeek.push(post);
    } else if (postDateStart.getMonth() === lastMonth.getMonth() && postDateStart.getFullYear() === lastMonth.getFullYear()) {
      grouped.lastMonth.push(post);
    } else {
      const monthYearKey = postDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });
      if (!grouped.months[monthYearKey]) {
        grouped.months[monthYearKey] = [];
      }
      grouped.months[monthYearKey].push(post);
    }
  });

  return grouped;
}