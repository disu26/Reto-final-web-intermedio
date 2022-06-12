package co.com.sofka.questions;

import co.com.sofka.questions.controller.QuestionController;
import co.com.sofka.questions.dto.AnswerDTO;
import co.com.sofka.questions.dto.QuestionDTO;
import co.com.sofka.questions.service.QuestionService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebFluxTest(QuestionController.class)
class QuestionTest {
    @Autowired
    private WebTestClient webTestClient;
    @MockBean
    private QuestionService service;


    @Test
    public void createQuestion(){
        Mono<QuestionDTO> questionDTOMono = Mono.just(
                new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica")
        );

        AnswerDTO answer = new AnswerDTO("111", "321", "4", 1);
        List<AnswerDTO> listA = new ArrayList<>();
        listA.add(answer);


        QuestionDTO questionDTO = new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica", listA);
        when(service.createQuestion(questionDTO)).thenReturn(Mono.just("111"));

        webTestClient.post().uri("/create")
                .body(BodyInserters.fromObject(questionDTO)) // Mejorar
                .exchange()
                .expectStatus().isOk(); //200
    }

    @Test
    public void deleteQuestion(){
        given(service.deleteQuestion(any())).willReturn(Mono.empty());
        webTestClient.delete().uri("/delete/102")
                .exchange()
                .expectStatus().isOk();//200
    }

    @Test
    public void getAllTest(){
        Flux<QuestionDTO> questionDtoFlux = Flux.just(
                new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica"),
                new QuestionDTO("112", "123", "6+3=?", "Logica", "Matematica"),
                new QuestionDTO("113", "123", "10+4=?", "Logica", "Matematica")
        );
        when(service.getAll()).thenReturn(questionDtoFlux);

        Flux<QuestionDTO> responseBody = webTestClient.get().uri("/getAll")
                .exchange()
                .expectStatus().isOk() //200
                .returnResult(QuestionDTO.class)
                .getResponseBody();

        StepVerifier.create(responseBody)
                .expectSubscription()
                .expectNext(new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("112", "123", "6+3=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("113", "123", "10+4=?", "Logica", "Matematica"))
                .verifyComplete();
    }

    @Test
    public void getOwnerAllTest(){
        Flux<QuestionDTO> questionDtoFlux = Flux.just(
                new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica"),
                new QuestionDTO("112", "123", "6+3=?", "Logica", "Matematica"),
                new QuestionDTO("113", "123", "10+4=?", "Logica", "Matematica")
        );
        when(service.getOwnerAll("123")).thenReturn(questionDtoFlux);

        Flux<QuestionDTO> responseBody = webTestClient.get().uri("/getOwnerAll/123")
                .exchange()
                .expectStatus().isOk() //200
                .returnResult(QuestionDTO.class)
                .getResponseBody();

        StepVerifier.create(responseBody)
                .expectSubscription()
                .expectNext(new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("112", "123", "6+3=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("113", "123", "10+4=?", "Logica", "Matematica"))
                .verifyComplete();
    }

    @Test
    public void updateQuestionTest(){
        Mono<QuestionDTO> questionDTOMono = Mono.just(
                new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica")
        );

        AnswerDTO answer = new AnswerDTO("111", "321", "4", 1);
        List<AnswerDTO> listA = new ArrayList<>();
        listA.add(answer);

        QuestionDTO questionDTO = new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica", listA);
        when(service.updateQuestion(questionDTO)).thenReturn(Mono.just("111"));

        webTestClient.put().uri("/update")
                .body(BodyInserters.fromObject(questionDTO))
                .exchange()
                .expectStatus().isOk(); //200
    }

    @Test
    public void getPage(){

        Flux<QuestionDTO> questionDtoFlux = Flux.just(
                new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica"),
                new QuestionDTO("112", "123", "6+3=?", "Logica", "Matematica"),
                new QuestionDTO("113", "123", "10+4=?", "Logica", "Matematica"),
                new QuestionDTO("114", "123", "6+3=?", "Logica", "Matematica"),
                new QuestionDTO("115", "123", "6+3=?", "Logica", "Matematica"),
                new QuestionDTO("116", "123", "6+3=?", "Logica", "Matematica"),
                new QuestionDTO("117", "123", "6+3=?", "Logica", "Matematica"),
                new QuestionDTO("118", "123", "6+3=?", "Logica", "Matematica"),
                new QuestionDTO("119", "123", "6+3=?", "Logica", "Matematica"),
                new QuestionDTO("120", "123", "6+3=?", "Logica", "Matematica")
        );

        when(service.getPage(1)).thenReturn(questionDtoFlux);

        Flux<QuestionDTO> responseBody = webTestClient.get().uri("/pagination/1")
                .exchange()
                .expectStatus().isOk() //200
                .returnResult(QuestionDTO.class)
                .getResponseBody();

        StepVerifier.create(responseBody)
                .expectSubscription()
                .expectNext(new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("112", "123", "6+3=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("113", "123", "10+4=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("114", "123", "6+3=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("115", "123", "6+3=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("116", "123", "6+3=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("117", "123", "6+3=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("118", "123", "6+3=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("119", "123", "6+3=?", "Logica", "Matematica"))
                .expectNext(new QuestionDTO("120", "123", "6+3=?", "Logica", "Matematica"))
                .verifyComplete();
    }

    @Test
    public void getCountQuestion(){
        AnswerDTO answer = new AnswerDTO("111", "321", "4", 1);
        List<AnswerDTO> listA = new ArrayList<>();
        listA.add(answer);


        QuestionDTO questionDTO = new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica", listA);

        service.createQuestion(questionDTO);
        when(service.getCountQuestions()).thenReturn(Mono.just(1L));

        Flux<Long> responseBody = webTestClient.get().uri("/countQuestions")
                .exchange()
                .expectStatus().isOk() //200
                .returnResult(Long.class)
                .getResponseBody();

        StepVerifier.create(responseBody)
                .expectSubscription()
                .expectNext(1L)
                .verifyComplete();
    }

    @Test
    public void getTotalPages(){

        service.createQuestion(new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica"));
        service.createQuestion(new QuestionDTO("112", "123", "6+3=?", "Logica", "Matematica"));
        service.createQuestion(new QuestionDTO("113", "123", "10+4=?", "Logica", "Matematica"));
        service.createQuestion(new QuestionDTO("114", "123", "6+3=?", "Logica", "Matematica"));
        service.createQuestion(new QuestionDTO("115", "123", "6+3=?", "Logica", "Matematica"));
        service.createQuestion(new QuestionDTO("116", "123", "6+3=?", "Logica", "Matematica"));
        service.createQuestion(new QuestionDTO("117", "123", "6+3=?", "Logica", "Matematica"));
        service.createQuestion(new QuestionDTO("118", "123", "6+3=?", "Logica", "Matematica"));
        service.createQuestion(new QuestionDTO("119", "123", "6+3=?", "Logica", "Matematica"));
        service.createQuestion(new QuestionDTO("120", "123", "6+3=?", "Logica", "Matematica"));
        service.createQuestion(new QuestionDTO("121", "123", "6+3=?", "Logica", "Matematica"));

        when(service.getTotalPages()).thenReturn(Mono.just(2L));

        Flux<Long> responseBody = webTestClient.get().uri("/totalPages")
                .exchange()
                .expectStatus().isOk() //200
                .returnResult(Long.class)
                .getResponseBody();

        StepVerifier.create(responseBody)
                .expectSubscription()
                .expectNext(2L)
                .verifyComplete();
    }
}
