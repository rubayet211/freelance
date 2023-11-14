import { Controller, Get, Param, ParseIntPipe, Req, Res } from '@nestjs/common';
import { FreelancerService } from './freelancer.service';

@Controller('freelancer')
export class FreelancerController {
  constructor(private freelancerService: FreelancerService) {}

  @Get('getById/:id')
  async getFreelancerById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Res() res,
  ) {
    try {
      const freelancer = await this.freelancerService.getFreelancerById(id);
      if (!freelancer) {
        return res.status(404).json({ message: 'Freelancer not found' });
      }
      res.status(200).json(freelancer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
