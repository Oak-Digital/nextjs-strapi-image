import { IMedia } from "./builtins/Media";
import { ExtractNested } from "./builtins/ExtractNested";
import { ExtractFlat } from "./builtins/ExtractFlat";
import { RequiredBy } from "./builtins/RequiredBy";
export interface IPage<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      title: string | null;
      image?: { data: IMedia | null };
    },
    ExtractFlat<Populate>
  >;
}
