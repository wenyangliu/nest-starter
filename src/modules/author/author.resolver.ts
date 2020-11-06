import { Resolver, Query, Parent, ResolveField, Args, Int } from '@nestjs/graphql';
import { Author } from './graphql/author.graphql';

@Resolver(() => Author)
export class AuthorResolver {

  @Query(() => Author)
  async author(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return {
      id,
      firstName: 'name',
      lastName: 'mase',
    };
  }

  @ResolveField()
  async posts(@Parent() author: Author): Promise<any> {
    const { id } = author;
    console.log(id);
    return [
      {
        id: 4,
        title: 'hello',
        votes: 2789,
      },
    ];
  }
}
