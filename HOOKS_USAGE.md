# Hooks Usage Guide

This guide explains how to use the custom hooks in this project.

## Authentication Hooks

### `useLoginMutation` - For User Login

**Location:** `hooks/auth/useLoginMutation.ts`

Custom hook that handles login mutations with automatic redirect on success.

#### Basic Usage

```tsx
import { useLoginMutation } from '@/hooks/auth/useLoginMutation';

function LoginPage() {
  const loginMutation = useLoginMutation();

  const handleLogin = () => {
    loginMutation.mutate({
      email: 'user@example.com',
      password: 'password123',
    });
  };

  return (
    <button 
      onClick={handleLogin} 
      disabled={loginMutation.isPending}
    >
      {loginMutation.isPending ? 'Logging in...' : 'Login'}
    </button>
  );
}
```

#### With Custom Options

```tsx
const loginMutation = useLoginMutation({
  // Custom redirect path
  redirectTo: '/admin',
  
  // Success callback (runs before redirect)
  onSuccess: (data) => {
    console.log('Logged in as:', data.user.name);
  },
  
  // Error callback
  onError: (error) => {
    console.error('Login failed:', error.message);
  },
});
```

#### Features

- ✅ Automatic redirect to `/dashboard` on success (customizable)
- ✅ Handles token storage in HTTP-only cookies
- ✅ Type-safe with TypeScript
- ✅ Custom success/error callbacks
- ✅ Built on TanStack Query

---

## Data Fetching Hooks

## `useFetch` - For Fetching Data (GET requests)

**Location:** `hooks/useFetch.ts`

Simple hook for fetching data from the API. Automatically handles authentication and errors.

### Basic Usage

```tsx
import { useFetch } from '@/hooks/useFetch';

function MyComponent() {
  const { data, isLoading, error, refetch } = useFetch<User>('/user');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Hello, {data?.name}!</div>;
}
```

### With Options

```tsx
const { data } = useFetch<User[]>('/users', {
  enabled: shouldFetch,        // Only fetch when true
  staleTime: 10 * 60 * 1000,  // Cache for 10 minutes
});
```

### Features

- ✅ Automatic token attachment via axios interceptor
- ✅ Automatic 401/403 error handling (triggers logout)
- ✅ Type-safe with TypeScript generics
- ✅ Built on TanStack Query (caching, refetching, etc.)

---

## `useMutate` - For Creating/Updating/Deleting Data

**Location:** `hooks/useMutate.ts`

Simple hook for mutations (POST, PUT, PATCH, DELETE). Automatically handles authentication and errors.

### Basic Usage

#### POST Request

```tsx
import { useMutate } from '@/hooks/useMutate';

function CreateUser() {
  const createUser = useMutate<User, UserInput>('/users', 'POST');

  const handleCreate = () => {
    createUser.mutate({ name: 'John', email: 'john@example.com' });
  };

  return (
    <button onClick={handleCreate} disabled={createUser.isPending}>
      {createUser.isPending ? 'Creating...' : 'Create User'}
    </button>
  );
}
```

#### DELETE Request

```tsx
const deleteUser = useMutate('/users/123', 'DELETE');

<button onClick={() => deleteUser.mutate()}>Delete</button>
```

#### PUT/PATCH Request

```tsx
const updateUser = useMutate<User, Partial<User>>('/users/123', 'PUT');

updateUser.mutate({ name: 'Updated Name' });
```

### With Options

```tsx
const createUser = useMutate<User, UserInput>('/users', 'POST', {
  // Invalidate queries after success (refresh data)
  invalidates: ['/users'],
  
  // Suppress automatic logout/redirect on 401/403 (e.g., for login forms)
  suppressAuthRedirect: true,
  
  // Success callback
  onSuccess: (data) => {
    console.log('User created!', data);
    router.push('/users');
  },
  
  // Error callback
  onError: (error) => {
    console.error('Failed to create user', error);
  },
});
```

### Features

- ✅ Automatic token attachment via axios interceptor
- ✅ Automatic 401/403 error handling (triggers logout)
- ✅ Optional suppression of auth redirects (e.g. for login)
- ✅ Automatic query invalidation (refresh data after mutations)
- ✅ Type-safe with TypeScript generics
- ✅ Built on TanStack Query

---

## Centralized Logout

**Location:** `utils/logout.ts`

The logout functionality is centralized to handle all cleanup in one place.

### Usage

```tsx
import { performLogout } from '@/utils/logout';
import { useRouter } from 'next/navigation';

function MyComponent() {
  const router = useRouter();

  const handleLogout = () => {
    performLogout();  // Clears cookies + React Query cache
    router.push('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### What it does

1. Clears authentication cookies
2. Clears React Query cache globally
3. Can be extended for other cleanup tasks

**Note:** You don't need to manually call `queryClient.clear()` anymore!

---

## API Request Flow

```
User Action
    ↓
Hook (useFetch/useMutate)
    ↓
Axios Instance (lib/axios.ts)
    ↓
[Request Interceptor adds token]
    ↓
API Call
    ↓
[Response Interceptor handles 401]
    ↓
Success or Error callback
```

### Authentication Error Handling

Both hooks automatically handle authentication errors:

- **401/403 errors** → Triggers `performLogout()` → Redirects to `/login`
- **Other errors** → Returns error to component

---

## Examples

### Complete CRUD Example

```tsx
import { useFetch } from '@/hooks/useFetch';
import { useMutate } from '@/hooks/useMutate';

function UsersPage() {
  // Fetch users
  const { data: users, isLoading } = useFetch<User[]>('/users');

  // Create user
  const createUser = useMutate<User, UserInput>('/users', 'POST', {
    invalidates: ['/users'], // Refresh user list after create
  });

  // Update user
  const updateUser = useMutate<User, Partial<User>>(
    `/users/${selectedId}`,
    'PUT',
    { invalidates: ['/users'] }
  );

  // Delete user
  const deleteUser = useMutate(`/users/${selectedId}`, 'DELETE', {
    invalidates: ['/users'],
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        users?.map((user) => <div key={user.id}>{user.name}</div>)
      )}
    </div>
  );
}
```

---

## Best Practices

1. **Use TypeScript generics** for type safety
   ```tsx
   useFetch<User>('/user')  // ✅ Good
   useFetch('/user')        // ❌ No type safety
   ```

2. **Invalidate queries after mutations** to refresh data
   ```tsx
   useMutate('/users', 'POST', { invalidates: ['/users'] })
   ```

3. **Handle loading and error states** in your components
   ```tsx
   if (isLoading) return <Spinner />;
   if (error) return <Error message={error.message} />;
   ```

4. **Use the centralized logout** instead of manual cleanup
   ```tsx
   performLogout(); // ✅ Good
   authService.logout(); queryClient.clear(); // ❌ Manual cleanup
   ```
