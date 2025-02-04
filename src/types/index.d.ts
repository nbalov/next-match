
import {ZodIssue} from 'zod';

// type discriminated union
type ActionResult<T> = 
    {status: 'success', data: T} | 
    {status: 'error', error: string|ZodIssue[]}