import { IStatus } from '../models/status';
import { name_processor } from './name_processor';

export const isAudience = (status : IStatus) => {
    // follow more than friends
    let follower : boolean = status.user.followers_count < status.user.friends_count;

    // individual v company/ad
    let individual = name_processor(status.user.name);
    
    // like individuals with no sensitive content
    return follower && individual && !status.possibly_sensitive;
}