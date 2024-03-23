import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { UsersService } from '../users/users.service'; // Adjust the path as needed

@Processor('user-history') // Specify the queue name
export class SaveUserHistoryProcessor {

    constructor(private readonly userService: UsersService) {} // Inject the user history service

    @Process()
    async saveUserHistory(job: Job) {
        console.log('Processing user history job...', job.data);
        const data = job.data;

        try {
            const savedData = await this.userService.saveUserHistory(data);
        } catch (error) {
            console.error(`Error saving user history data: ${error.message}`);
            throw error;
        }
    }
}
