package co.com.sofka.questions;

import co.com.sofka.questions.controller.AnswerController;
import co.com.sofka.questions.dto.AnswerDTO;
import co.com.sofka.questions.dto.QuestionDTO;
import co.com.sofka.questions.service.AnswerService;
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

import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebFluxTest(AnswerController.class)
class AnswerTest {

    @Autowired
    private WebTestClient webTestClient;
    @MockBean
    private AnswerService service;

    @Test
    public void addAnswer(){
        AnswerDTO answerDTO = new AnswerDTO( "111","321", "4", 1);
        List<AnswerDTO> listA = new ArrayList<>();
        listA.add(answerDTO);

        Mono<QuestionDTO> questionDTOMono = Mono.just(
                new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica", listA)
        );
        when(service.addAnswer(answerDTO)).thenReturn(questionDTOMono);

        webTestClient.post().uri("/add")
                .body(BodyInserters.fromObject(answerDTO)) // Mejorar
                .exchange()
                .expectStatus().isOk(); //200
    }

    @Test
    public void getAnswerTest(){ // En el service se llama getQuestion
        AnswerDTO answerDTO = new AnswerDTO( "111","321", "4", 1);
        List<AnswerDTO> listA = new ArrayList<>();
        listA.add(answerDTO);

        Mono<QuestionDTO> questionDTOMono = Mono.just(
                new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica", listA)
        );
        when(service.getQuestion("111")).thenReturn(questionDTOMono);

        Flux<QuestionDTO> responseBody = webTestClient.get().uri("/get/111")
                .exchange()
                .expectStatus().isOk() //200
                .returnResult(QuestionDTO.class)
                .getResponseBody();

        StepVerifier.create(responseBody)
                .expectSubscription()
                .expectNext(new QuestionDTO("111", "123", "2+2=?", "Logica", "Matematica", listA))
                .verifyComplete();
    }

    @Test
    public void updateAnswerTest(){
        AnswerDTO answerDTO = new AnswerDTO( "123","111","321", "4", 1);

        when(service.updateAnswer(answerDTO)).thenReturn(Mono.just("123"));

        webTestClient.put().uri("/updateAnswer")
                .body(BodyInserters.fromObject(answerDTO))
                .exchange()
                .expectStatus().isOk(); //200
    }
}
