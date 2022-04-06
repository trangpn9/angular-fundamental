import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AuthService } from "src/app/user/auth.service";
import { DurationPipe } from "../shared";
import { SessionListComponent } from "./session-list.component";
import { VoterService } from "./vote.service";

describe('SessionListComponent', () => {
  let mockAuthService: any,
    mockVoterService: any,
    fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    element: HTMLElement,
    debugEl: DebugElement;

  describe('initial display', () => {
    beforeEach(() => {
      mockAuthService = { isAuthenticated: () => true, currentUser: {id: 4, firstName: 'Phan', lastName: 'Trang', userName: 'TrangPN'} };
      mockVoterService = { userHasVoted: () => true };
      TestBed.configureTestingModule({
        declarations: [
          SessionListComponent,
          DurationPipe,
        ],
        providers: [
          { provide: AuthService, useValue: mockAuthService },
          { provide: VoterService, useValue: mockVoterService }
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ],
      });
      fixture = TestBed.createComponent(SessionListComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
      element = fixture.nativeElement;

    });

    it('should have the correct title', () => {
      component.sessions = [
        {name: 'Session 1', id: 3, presenter: 'TrangPN', duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john', 'baba']}
      ];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;
      component.ngOnChanges();

      fixture.detectChanges();

      // expect(element.querySelector('[well-title]')?.textContent).toContain('Session 1');
      expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
    });

  });
});