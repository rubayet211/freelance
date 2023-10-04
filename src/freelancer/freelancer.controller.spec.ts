import { Test, TestingModule } from '@nestjs/testing';
import { FreelancerController } from './freelancer.controller';

describe('FreelancerController', () => {
  let controller: FreelancerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreelancerController],
    }).compile();

    controller = module.get<FreelancerController>(FreelancerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
