package co.com.sofka.questions.usecases;

import co.com.sofka.questions.dto.QuestionDTO;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@FunctionalInterface
public interface SaveQuestion {
    Mono<String> apply(@Valid QuestionDTO questionDTO);
}
