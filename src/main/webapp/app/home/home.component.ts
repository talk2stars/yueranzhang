import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    classeNameNeedToReg: string;
    course_name_reg: string;
    course_location_reg: string;
    course_content_reg: string;
    teacher_id_reg: number;
    courses: CourseDto[] = [];
    coursesWithTN: CourseWithTNDto[] = [];
    newCourse: CourseDto;
    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getAllCourses() {
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    deleteCourse(courseName: string) {
        this.courseService.delete(courseName).subscribe(response => {
            alert(response);
        });
    }

    addCourse(course_name_reg, course_location_reg, course_content_reg, teacher_id_reg) {
        this.newCourse.courseName = course_name_reg;
        this.newCourse.courseLocation = course_location_reg;
        this.newCourse.courseContent = course_content_reg;
        this.newCourse.teacherId = teacher_id_reg;
        this.courseService.add(this.newCourse).subscribe(response => {
            alert(response);
        });
    }
    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    // registerCourse(courseName) {
    //
    // }

    clearAllCourses() {
        this.courses = [];
    }
}
