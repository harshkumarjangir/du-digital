
# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/login` | Login user and get JWT token | No |
| `GET` | `/me` | Get current logged-in user details | **Yes** |

## User Management (`/users`)
*Protected: Admin Only*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Get all users |
| `POST` | `/` | Create a new user (Admin, HR, Sales, User) |
| `PUT` | `/:id` | Update user details (including role/permissions) |
| `DELETE` | `/:id` | Delete a user |

## Sales Experts (`/sales-experts`)
*Protected: Uses `User` model with role="sales"*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Get all sales experts |
| `POST` | `/` | Add a new sales expert |
| `PUT` | `/:id` | Update sales expert details |
| `DELETE` | `/:id` | Delete sales expert |

## Blogs (`/blogs`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all blogs | No |
| `GET` | `/:id` | Get single blog by ID | No |
| `POST` | `/` | Create blog (FormData: `featuredImage`) | **Yes** |
| `PUT` | `/:id` | Update blog (FormData: optional `featuredImage`) | **Yes** |
| `DELETE` | `/:id` | Delete blog | **Yes** |

## News & Media (`/news`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all news items | No |
| `POST` | `/` | Create news (FormData: `image`) | **Yes** |
| `PUT` | `/:id` | Update news (FormData: optional `image`) | **Yes** |
| `DELETE` | `/:id` | Delete news | **Yes** |

## Events (`/events`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all events | No |
| `POST` | `/` | Create event (FormData: `image`) | **Yes** |
| `GET` | `/:id/images` | Get event gallery images | No |
| `POST` | `/:id/images` | Upload gallery images (FormData: `images` array) | **Yes** |

## Gallery (`/gallery`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all gallery images | No |
| `POST` | `/` | Upload image (FormData: `image`) | **Yes** |
| `DELETE` | `/:id` | Delete image | **Yes** |

## Videos (`/videos`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all videos | No |
| `POST` | `/` | Add video (YouTube URL) | **Yes** |
| `PUT` | `/:id` | Update video details | **Yes** |
| `DELETE` | `/:id` | Delete video | **Yes** |

## Investor Relations (`/investor`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/stats` | Get investor dashboard stats | No |
| `GET` | `/categories` | Get all investor categories | No |
| `GET` | `/category/:slug` | Get specific category with reports | No |
| `POST` | `/report` | Create report (FormData: `pdf`) | **Yes** |
| `PUT` | `/report/:id` | Update report (FormData: optional `pdf`) | **Yes** |
| `DELETE` | `/report/:id` | Delete report | **Yes** |

## Office Locations (`/office`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/locations` | Get all office locations | No |
| `GET` | `/locations/grouped` | Get locations grouped by type (India/Global) | No |
| `GET` | `/types` | Get office types | No |
| `POST` | `/locations` | Add office location | **Yes** |
| `DELETE` | `/locations/:id` | Delete office location | **Yes** |
| `POST` | `/types` | Add office type | **Yes** |
| `DELETE` | `/types/:id` | Delete office type | **Yes** |

## Team Members (`/team-members`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all team members | No |
| `POST` | `/` | Add team member | **Yes** |
| `PUT` | `/:id` | Update team member | **Yes** |
| `DELETE` | `/:id` | Delete team member | **Yes** |

## Careers / Jobs (`/careers`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all job vacancies | No |
| `POST` | `/` | Post a new job vacancy | **Yes** |
| `DELETE` | `/:id` | Delete a job vacancy | **Yes** |

## Applicants (`/employees`)
*Note: This is misleadingly named 'employees' but used for job applications*

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Submit job application (FormData: `cv`) | No |
| `GET` | `/` | Get all applications | **Yes** |

## Contact Inquiries (`/contact`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Submit contact form | No |
| `GET` | `/` | Get all inquiries | **Yes** |
| `GET` | `/stats` | Get inquiry statistics | **Yes** |

## Partner Requests (`/partner`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Submit partner request | No |
| `GET` | `/` | Get all partner requests | **Yes** |
| `GET` | `/stats` | Get partner stats | **Yes** |
