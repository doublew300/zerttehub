UPDATE public.resources
SET 
    is_free = true,
    content = '# Harvard Resume Template

## Header
**FIRST NAME LAST NAME**
City, State, Zip Code | Phone Number | Email | LinkedIn URL

## Education
**HARVARD UNIVERSITY**
*Degree, Concentration* (Expected May 2025)
- Relevant Coursework: Economics, Statistics, Strategy.
- Awards: Dean''s List (2023-2024).

**HIGH SCHOOL NAME**
*High School Diploma* (May 2021)
- GPA: 4.0/4.0

## Experience
**COMPANY NAME** | City, State
*Position Title* (June 2024 – Present)
- Action Verb + Context + Result (e.g., "Analyzed market trends to identify 3 key growth opportunities, resulting in a 15% revenue increase").
- Led a team of 5 interns...

**ORGANIZATION NAME** | City, State
*Role* (June 2023 – August 2023)
- Developed a marketing strategy...

## Leadership & Activities
**STUDENT CLUB**
*President*
- Organized annual conference for 200+ attendees.

## Skills & Interests
- **Technical**: Python, SQL, Excel.
- **Languages**: English (Native), Spanish (Fluent).
- **Interests**: Chess, Marathon Running.'
WHERE title = 'Шаблон идеального CV (Harvard style)';
